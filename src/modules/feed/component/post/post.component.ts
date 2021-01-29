import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Post} from '../../post.model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild('anchor')
  anchor: ElementRef<HTMLDivElement>;

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    console.log(this.post.message.attachements);
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
    this.post.liked = !this.post.liked;
    await this.postService.like(this.post);
  }


  createText(message: string): string {
    const reg = /http[s]?:\/\/\S+/g;
    const mention = /\@([\w.\-]+)/g;
    let createdLink = message.replace(reg, str => `<a href="${str}" target="_blank">${str}</a>`);
    createdLink = createdLink.replace(mention, str => `<a>${str}</a>`);


    return createdLink;
  }

  play(): void {
    this.videoPlayer?.nativeElement.play();
  }
}
