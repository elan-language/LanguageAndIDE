import { Statement } from "./statement";
import {Comment} from "../globals/comment";
import { Member } from "../members/member";

export class CommentStatement extends Comment implements Statement, Member {

    renderAsHtml(): string {
        return `<statement>${super.renderAsHtml()}</statement>`;
    }

}