package com.server.server.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.server.server.entity.Users;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUsername(String username);

    @Query("SELECT u FROM Users u WHERE u.username = :username AND u.password = :password")
    Optional<Users> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    boolean existsByUsername(String username);
}