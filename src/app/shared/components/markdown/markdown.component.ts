import {Component, Input, Output, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-markdown, [appMarkdown]',
  template: `
    <article #article class="markdown" [innerHTML]="markdown"></article>
    <pre #content style="display: none;"><ng-content></ng-content></pre>
  `,
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {

  private attrValue: string;
  private attrSrc: string;

  markdown: string;

  @ViewChild('content') content: ElementRef;
  @ViewChild('article') article: ElementRef;

  @Output() error = new EventEmitter<HttpErrorResponse>();
  @Input() options: { [key: string]: any; } = {};

  @Input()
  set value(value: string) {
    this.attrValue = value;
    this.render(value);
  }

  get value() {
    return this.attrValue;
  }

  @Input()
  set src(url: string) {
    this.attrSrc = url;
    this.markdown = 'loading...';
    this.http.get(url, {responseType: 'text'}).toPromise()
      .then(data => this.render(data))
      .catch((err: HttpErrorResponse) => {
        this.markdown = '';
        this.error.emit(err);
      });
  }

  get src() {
    return this.attrSrc;
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if (!this.value && !this.src) {
      this.render(this.content.nativeElement.innerText);
    }
  }

  render(str: any) {
    this.markdown = marked(String(str), this.getOptions());

    if (this.article.nativeElement.hasAttribute('lg-uid')) {
      this.article.nativeElement.removeAttribute('lg-uid');
      this.article.nativeElement.removeAttribute('lg-event-uid');
    }
    setTimeout(() => {
      window['lightGallery'](this.article.nativeElement, {selector: '.image'});
    }, 10);
  }

  getOptions() {
    const renderer = new marked.Renderer();
    renderer.text = function (text) {
      return text.replace(/\s*:icon-([\w-]+):\s*/, ` <i class="anticon anticon-$1"></i> `)
        .replace(/\s*:fa-([\w-]+):\s*/, ` <i class="fa fa-$1"></i> `);
    };
    renderer.paragraph = function (text) {
      return '<p>' + text.replace(/\s*\[\[(.*?)\]\]\s*/g, ` <kbd>$1</kbd> `)
        .replace(/\s*~(.*?)~\s*/, ` <ins>$1</ins> `) + '</p>\n';
    };
    renderer.listitem = function (text) {
      if (/^\s*\[[x\s]\]\s*/.test(text)) {
        text = text.replace(/^\s*\[\s\]\s*/, '<i class="fa fa-square-o"></i> ')
          .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square-o"></i> ');
      }
      return '<li>' + text + '</li>';
    };
    renderer.image = function (href, title, text) {
      let out = '<a class="image" href="' + href + '" target="_blank">';
      out += '<img src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
      out += '</a>';
      return out;
    };

    const options = {
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs language-',
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    };
    return Object.assign({}, options, this.options);
  }

}
