export class FrameModel {

    public load(rawCode : string){

    }


    public renderAsHtml() {
      return `
      <div id='1' class='frame'><span class='keyword'>main</span>
      <div id='2' class='frame'><span class='keyword'>var</span> a <span class='keyword'>set to</span><span class='string-value'> "Hello World"</span></div>
      <span class='keyword'>end main</span></div>`;
    }

}