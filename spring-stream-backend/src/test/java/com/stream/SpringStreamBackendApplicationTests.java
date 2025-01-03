package com.stream;

import com.stream.services.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringStreamBackendApplicationTests {

    @Autowired
    VideoService videoService;

    @Test
    void contextLoad(){
        videoService.processVideo("900b73ec-4173-4e15-b21a-ff07fea3365c");
    }
}
