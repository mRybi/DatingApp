﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.Dtos;
using DatingApp.Models;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                  {
                      opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                  })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailsDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
            .ForMember(dest => dest.SenderPhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
            .ForMember(dest => dest.RecipientPhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url);
                });



        }
    }
}
