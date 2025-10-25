
## Report on building on Linux

## 1. Background

These are some notes on running the Elan build on a Linux system.\
It was tested on Linux Mint 20 Xfce, a lightweight Linux distribution.\
It shows how to run Node.js npm in a Docker container from the command line.

## 2. Node.js in a Docker container

The advantage of running things in Docker containers is to avoid having to install dependencies in your main operating system.  It also is a little more secure, because the container can only write to directories which are mapped into the container.

Select a suitable image from https://hub.docker.com/_/node.  The scripts below use `node:24.9.0-alpine3.22`.
It's actually better to use an Active or Maintenance version of Node.js if you don't need the latest features. So Node.js version 22 would have been a better choice for stability, but I have had no problems with version 24.
There has actually been another release since I started with that one.

Specify an exact name for the Docker image so that Docker doesn't keep checking for a newer one and/or downloading a newer one.
More info: https://nodejs.org/en/about/previous-releases

This is one way to run npm for building and testing the Elan code, using a shell alias:

`alias npm='docker run -e NO_COLOR=1 -e FORCE_COLOR=0 -e TERM=dumb -it --rm --name my-running-script -v "$PWD":/usr/src/app -v /home/cw/nobackup/tech/elan-git/npmroot:/root -w /usr/src/app node:24.9.0-alpine3.22 npm'`

See: https://www.docker.com/blog/how-to-use-the-node-docker-official-image/

This should be run in the LanguageAndIDE directory which `git` creates when you clone the repository.
So `LanguageAndIDE` is mapped onto `/usr/src/app` in the container.
In my case, `$PWD` always expands to `/home/cw/nobackup/tech/elan-git/LanguageAndIDE`.

We need to map `/root` in the container to a directory outside the container because `/root/.npm/` is where `npm` keeps its logs, module cache and config file.  Nothing inside the container is remembered from run to run unless its directory is mapped to the outside using `-v`.  There are just the two mappings in the command line above.

When you run `npm install` it creates about 10,000 files (155 MB) in `node_modules`, and puts 34 MB in the cache at `npmroot/.npm/_cacache/`.

`npm` runs multiple times doing various tasks when you invoke say `npm run dev-compile` so I raised the number of logs it keeps (in `npmroot/.npm/_logs`) from 10 to 50 in `npmroot/.npmrc` :
```
logs-max=50
color=false
```
It turns out that these logs is only useful for debugging the actual operation of npm itself.  All the interesting output from the compile or build runs comes out on standard out.  I have seen nothing come out on standard error.

The exit status from `npm run dev-compile` and `npm run test` is equal to the number of compilation errors or test failures respectively.  The script below does `echo $?` so that you can see the status without opening the log, which is redirected to a file.

You can see the various environment variables and npm config setting to stop it putting colour and cursor movement codes in the output, which I prefer to redirect to a file and examine in the editor. `TERM=dumb` is the last I tried, and it may be enough to stop the terminal control codes by itself but I have not tried that.

This is the script that I usually use now.  Optional parameters "c" for compile only, "t" for test only, and "a" for an arbitrary npm command, which I don't tend to use any more now.
```
cd /home/cw/nobackup/tech/elan-git/LanguageAndIDE
alias npm='docker run -e NO_COLOR=1 -e FORCE_COLOR=0 -e TERM=dumb -it --rm --name my-running-script -v "$PWD":/usr/src/app -v /home/cw/nobackup/tech/elan-git/npmroot:/root -w /usr/src/app node:24.9.0-alpine3.22 npm'
if test "z$1" = z
then
  # default is both compile and test
  action=ct
else
  action="$1"
fi
if expr match "$action" ".*c" > /dev/null
then
  echo Compiling $(date)
  npm run dev-compile > /run/user/1000/z/npm-compile-out.txt 2> /run/user/1000/z/npm-compile-err.txt
  echo $? "compile error(s)"
fi
if expr match "$action" ".*t" > /dev/null
then
  echo Running tests $(date)
  npm run test > /run/user/1000/z/npm-test-out.txt 2> /run/user/1000/z/npm-test-err.txt
  echo $? "test failure(s)"
fi
if expr match "$action" ".*a" > /dev/null
then
  echo Arbitrary npm command
  shift 1
  npm "$@"
fi
date
```
If you run `npm` with a docker image, it runs as root by default, so any directories it creates (eg `LanguageAndIDE/out/website`) will be owned by root and you need to use `sudo` to, for example, copy `cert.pem` in (see below for `cert.pem`).

## 3. CRLF and LF line endings

The text files are stored in the GitHub repository with LF (line feed) line endings.\
My copy of `git` keeps those endings when making its working copy locally.\
I think on Windows, the files are converted to CRLF (carriage return / line feed) line endings when creating the working copy to make it easier to work with them using Windows utilities.  And converted back to LF on committing to GitHub.\
The Elan build process includes a step which updates the `.elan` source files.
This has CRLF hard-coded in, which works fine on Windows but on Linux it has the effect of converting the LF endings to CRLF so that `git` thinks the file has changed.

For the moment, I have added the following line to my local copy of `src/build-scripts/update-elan-files.ts`:\
`newContent = newContent.replace(/\r/g, "");`\
in function `updateTestFileNew`.

This cannot be a proper solution because it would break the build on Windows.
One solution would be to check the format of the original file, but I can't work out a clean way get the flag out of `loadFileAsModelNew`!\
You could do a check like this:\
`var linefeedonly = source[source.indexOf("\n") - 1] !== "\r";`\
and remove the `\r` on writing the file if `linefeedonly` is true.

## 4. HTTPS server

In order for the encryption functions to work in Chrome, the Elan IDE needs to be served over HTTPS.\
I followed this page to set up a local HTTPS server using Python:\
https://danieldusek.com/starting-python-server-with-https-enabled-quickly.html

I changed `localhost` to `unk.home` in the server source as that is the name that I put in the certificate.
My computer is called `unk` and the `.home` is what my BT router uses for the names of local computers.

I copy `cert.pem` to `LanguageAndIDE/out/website` (using `sudo` as the directory is owned by root) and run the server from there.  I point the browser at `https://unk.home:4443/`.

