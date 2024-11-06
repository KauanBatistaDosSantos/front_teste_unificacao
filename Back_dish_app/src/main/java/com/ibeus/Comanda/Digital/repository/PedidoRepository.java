package com.ibeus.Comanda.Digital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ibeus.Comanda.Digital.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long>{
    @Query("SELECT p FROM Pedido p WHERE SUBSTRING(p.cliente.cpf, 1, 5) = :cpfInicio AND p.status <> 'Entregue'")
    Optional<Pedido> findByClienteCpfInicio(@Param("cpfInicio") String cpfInicio);
    Optional<Pedido> findTopByClienteIsNullOrderByIdDesc();
}
