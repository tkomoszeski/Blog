using System;

namespace Blog.Bll.Dto.Base
{
    public abstract class BaseDto {
        public int Id { get; set; }
        public DateTime CreationDate {get; set; }
        public DateTime ModificationDate {get; set; }
    }
}