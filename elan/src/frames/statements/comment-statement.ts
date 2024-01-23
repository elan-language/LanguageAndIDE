import { Statement } from "./statement";
import {Comment} from "../globals/comment";
import { Member } from "../class-members/member";

export class CommentStatement extends Comment implements Statement, Member {

    renderAsHtml(): string {
        return `<statement>${super.renderAsHtml()}</statement>`;
    }
    isStatement = true;
    isMember = true;
}