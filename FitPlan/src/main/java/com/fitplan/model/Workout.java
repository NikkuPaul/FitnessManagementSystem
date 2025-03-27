package com.fitplan.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workouts")
public class Workout {
    @Id
    private String id;
    private String name;
    private String description;
    private int duration;
    private String difficulty;

    // Constructors, getters, and setters
    public Workout() {}

    public Workout(String name, String description, int duration, String difficulty) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.difficulty = difficulty;
    }

    // Getters and setters for all fields
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}