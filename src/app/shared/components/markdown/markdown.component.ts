import {Component, AfterViewInit, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as markdown from 'markdown-it';

@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.css'],
})
export class MarkdownComponent implements AfterViewInit, OnChanges {

    private markdown: any;

    @Input() content: String = '';

    constructor(private ER: ElementRef) {
        this.markdown = new markdown({
            html: true,        // Enable HTML tags in source
            xhtmlOut: false,        // Use '/' to close single tags (<br />).
                                    // This is only for full CommonMark compatibility.
            breaks: true,        // Convert '\n' in paragraphs into <br>
            langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
                                      // useful for external highlighters.
            linkify: true,        // Autoconvert URL-like text to links

            // Enable some language-neutral replacement + quotes beautification
            typographer: true,

            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
            // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
            quotes: '“”‘’',

            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externaly.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function (/*str, lang*/) {
                return '';
            }
        });
    }

    ngAfterViewInit() {
        if (!this.content) {
            this.content = this.ER.nativeElement.textContent;
            this.generate();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('content' in changes) {
            this.generate();
        }
    }

    generate() {
        this.ER.nativeElement.innerHTML = this.markdown.render(this.content);
    }
}
