import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PostModel } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { TagModel } from 'src/app/tag/models/tag.model';
import { PostTagModel } from '../models/post-tag.model';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
    public model: PostModel;
    public tagName: String;


    constructor(private postService: PostService, private route: ActivatedRoute) {
        this.model = new PostModel();
     }

    public ngOnInit(): void {
        this.model.blogId = this.route.parent.snapshot.params['blogId'];
        const postId = this.route.snapshot.params['id'];
        if (postId) {
            this.postService.getPostById(postId).subscribe( response => {
                this.model = response;
            });
        }
    }

    public submit(model: PostModel): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.model.id = id;
            this.postService.updatePost(model).subscribe();
        } else {
            this.postService.addPost(model).subscribe();
        }
    }

    public addTag(tagName: string): void {
        const tagModel = new TagModel();
        tagModel.name = tagName;
        tagModel.id = 0;

        const postTag = new PostTagModel();
        postTag.Tag = tagModel;

        const searchTagModel = this.model.postTags.find(element => element.Tag.name === tagName);
        if (!searchTagModel) {
            this.model.postTags.push(postTag);
            this.tagName = '';
        }

    }

    public removeTag(tag: TagModel): void {
        const arrayWithoutRemovedTag = this.model.postTags.filter( element => {
            return element.Tag !== tag;
        });

        this.model.postTags = arrayWithoutRemovedTag;
    }




}
