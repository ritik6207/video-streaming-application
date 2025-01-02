package com.stream.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Video {

    @Id
    private String videoId;

    private String title;

    private String description;

    private String contentType;

    private String filePath;

//    @ManyToOne
//    private Course course;
}
