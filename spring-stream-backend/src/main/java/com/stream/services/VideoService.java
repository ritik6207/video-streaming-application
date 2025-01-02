package com.stream.services;

import com.stream.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

//    Save video
    Video save(Video video, MultipartFile file);


//    get video by id
      Video get(String videoId);


//    get video by title
    Video getByTitle(String title);

//    all videos
    List<Video> getAll();

}
