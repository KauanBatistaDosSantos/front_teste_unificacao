package com.ibeus.Comanda.Digital.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibeus.Comanda.Digital.model.Gerente;
import com.ibeus.Comanda.Digital.model.Motoboy;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.repository.GerenteRepository;
import com.ibeus.Comanda.Digital.repository.MotoboyRepository;
import com.ibeus.Comanda.Digital.repository.PedidoRepository;

@Service
public class GerenteService {

    @Autowired
    private GerenteRepository gerenteRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private MotoboyRepository motoboyRepository;

    
    

    public enum StatusPedido {
        RECEBIDO,
        EM_ANDAMENTO,
        SAIU_PARA_ENTREGA,
        ENTREGUE;
    }
    
    public Gerente salvarGerente(Gerente gerente) {
        return gerenteRepository.save(gerente);
    }

    public Optional<Gerente> buscarGerentePorId(Long id) {
        return gerenteRepository.findById(id);
    }

    public String avancarStatusPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    
  
        if (pedido.getStatus() == null) {
            pedido.setStatus("Recebido");
            pedidoRepository.save(pedido);
            return "Status do pedido foi definido como: Recebido";
        }
    
       
        switch (pedido.getStatus()) {
            case "Recebido" -> pedido.setStatus("Pedido sendo preparado");
            case "Pedido sendo preparado" -> pedido.setStatus("Pedido saiu para entrega");
            
            case "Saiu para entrega" -> {
                return "O pedido ja esta no maximo que o Gerente pode alterar";
            }
            default -> {
                return "Status do pedido inválido.";
            }
        }
    
        
        pedidoRepository.save(pedido);
        return "Status do pedido " + pedidoId + " atualizado para: " + pedido.getStatus();
    }

    public String retrocederStatusPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        switch (pedido.getStatus()) {
            case "Entregue" -> pedido.setStatus("Pedido saiu para entrega");
            case "Pedido saiu para entrega" -> pedido.setStatus("Pedido sendo preparado");
            case "Pedido sendo preparado" -> pedido.setStatus("Recebido");
            case "Recebido" -> {
                return "O pedido está no status inicial e não pode ser retrocedido.";
            }
            default -> {
                return "Status do pedido inválido.";
            }
        }

        pedidoRepository.save(pedido);
        return "Status do pedido " + pedidoId + " atualizado para: " + pedido.getStatus();
    }
    
    public Pedido atribuirMotoboyAoPedido(Long pedidoId, Long motoboyId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        Motoboy motoboy = motoboyRepository.findById(motoboyId)
                .orElseThrow(() -> new RuntimeException("Motoboy não encontrado"));

        pedido.setMotoboy(motoboy); // Atualizando o pedido com o motoboy selecionado
        return pedidoRepository.save(pedido);
    }
}

