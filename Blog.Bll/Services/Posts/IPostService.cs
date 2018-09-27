﻿using Blog.Bll.Dto.Posts;
using Blog.Bll.Dto.QueryModels;
using Blog.Dal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Bll.Services.Posts
{
    public interface IPostService
    {
        PostDto AddPost(PostCreateDto post);
        PostDto GetPostById(int postId);
        List<PostDto> GetAllPosts();
        PostDto DeletePost(int postId);
        PostDto EditPost(PostDto postDto);
        Task<PostDtoWithComments> GetPostWithCommentsByIdAsync(int postId);
        Task<PostDtoPaged> GetAllPostsPagedAsync(PostQuery searchQuery);
        Task<PostDtoPaged> GetAllPostPagedAsyncByBlogId(PostQuery searchQuery,int blogId);
    }
}
