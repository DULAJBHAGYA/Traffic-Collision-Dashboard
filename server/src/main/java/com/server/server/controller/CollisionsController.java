package com.server.server.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.server.server.service.CollisionsService;
import com.server.server.entity.Collisions;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/collisions")
@CrossOrigin(origins = "*") 
public class CollisionsController {
    
    private final CollisionsService collisionsService;
    
    // Constructor-based dependency injection (recommended)
    public CollisionsController(CollisionsService collisionsService) {
        this.collisionsService = collisionsService;
    }

    @PostMapping
    public ResponseEntity<Collisions> createCollision(@RequestBody Collisions collision) {
        try {
            Collisions savedCollision = collisionsService.createCollision(collision);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCollision);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Collisions>> getAllCollisions() {
        try {
            List<Collisions> collisions = collisionsService.getAllCollisions();
            if (collisions.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(collisions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Collisions> getCollisionById(@PathVariable Long id) {
        try {
            Optional<Collisions> collision = collisionsService.getCollisionById(id);
            return collision.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Collisions> updateCollision(@PathVariable Long id, 
                                                     @RequestBody Collisions collisionDetails) {
        try {
            Collisions updatedCollision = collisionsService.updateCollision(id, collisionDetails);
            return ResponseEntity.ok(updatedCollision);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollision(@PathVariable Long id) {
        try {
            collisionsService.deleteCollision(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
}