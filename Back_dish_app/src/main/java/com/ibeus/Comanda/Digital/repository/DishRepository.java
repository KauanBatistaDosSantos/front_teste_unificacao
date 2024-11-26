package com.ibeus.Comanda.Digital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ibeus.Comanda.Digital.model.Dish;

import java.util.List;

public interface DishRepository extends JpaRepository<Dish, Long> {
    List<Dish> findByCategory(String category);
    Dish findTopByOrderByIdDesc();
}