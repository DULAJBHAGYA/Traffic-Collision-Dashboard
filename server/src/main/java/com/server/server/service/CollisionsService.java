package com.server.server.service;

import org.springframework.stereotype.Service;
import com.server.server.repository.CollisionsRepository;
import com.server.server.entity.Collisions;
import java.util.List;
import java.util.Optional;

@Service
public class CollisionsService {

    private final CollisionsRepository collisionsRepository;

    public CollisionsService(CollisionsRepository collisionsRepository) {
        this.collisionsRepository = collisionsRepository;
    }

    // Create 
    public Collisions createCollision(Collisions collision) {
        return collisionsRepository.save(collision);
    }

    // Read all
    public List<Collisions> getAllCollisions() {
        return collisionsRepository.findAll();
    }

    // Read by ID
    public Optional<Collisions> getCollisionById(Long id) {
        return collisionsRepository.findById(id);
    }

    // Update 
    public Collisions updateCollision(Long id, Collisions collisionDetails) {
        return collisionsRepository.findById(id)
                .map(collision -> {
                    collision.setStatisticCode(collisionDetails.getStatisticCode());
                    collision.setStatisticLabel(collisionDetails.getStatisticLabel());
                    collision.setYear(collisionDetails.getYear());
                    collision.setMonthCode(collisionDetails.getMonthCode());
                    collision.setMonthName(collisionDetails.getMonthName());
                    collision.setUnit(collisionDetails.getUnit());
                    collision.setValue(collisionDetails.getValue());
                    return collisionsRepository.save(collision);
                })
                .orElseThrow(() -> new RuntimeException("Collision not found with id: " + id));
    }

    // Delete 
    public void deleteCollision(Long id) {
        if (collisionsRepository.existsById(id)) {
            collisionsRepository.deleteById(id);
        } else {
            throw new RuntimeException("Collision not found with id: " + id);
        }
    }

   
}