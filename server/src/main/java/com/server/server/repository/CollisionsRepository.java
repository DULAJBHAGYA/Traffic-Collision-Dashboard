package com.server.server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.server.server.entity.Collisions;
import java.util.List;
import java.util.Optional;

@Repository
public interface CollisionsRepository extends JpaRepository<Collisions, Long> {
    
    List<Collisions> findByYear(Integer year);
    
    List<Collisions> findByStatisticCode(String statisticCode);
    
    @Query("SELECT c FROM Collisions c WHERE c.year = :year AND c.monthCode = :monthCode")
    List<Collisions> findByYearAndMonth(@Param("year") Integer year, @Param("monthCode") String monthCode);
}