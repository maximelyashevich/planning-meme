package com.epam.meme.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "estimate_stories")
@Data
public class EstimateStory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "story_id")
    private Story story;
    private Short estimate;
}
