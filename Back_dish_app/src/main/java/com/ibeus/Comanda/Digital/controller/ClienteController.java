package com.ibeus.Comanda.Digital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibeus.Comanda.Digital.model.Cliente;
import com.ibeus.Comanda.Digital.service.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;      
   
    @PostMapping
    public Cliente criarCliente(@RequestBody Cliente cliente) {
        return clienteService.criarCliente(cliente);
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    
     @GetMapping("/acompanhar-pedido/{pedidoId}")
    public String acompanharPedido(@PathVariable Long pedidoId) {
        return clienteService.acompanharPedido(pedidoId);
    }
    // @PutMapping("/avancar-status/{pedidoId}")
    // public String avancarStatusPedido(@PathVariable Long pedidoId) {
    //     return clienteService.avancarStatusPedido(pedidoId);
    // }

    
    // @PutMapping("/retroceder-status/{pedidoId}")
    // public String retrocederStatusPedido(@PathVariable Long pedidoId) {
    //     return clienteService.retrocederStatusPedido(pedidoId);
    // }
    @PostMapping("/finalizarPedido")
    public ResponseEntity<String> finalizarPedido(@RequestBody Cliente clienteInfo) {
        try {
            clienteService.finalizarUltimoPedido(clienteInfo);
            return ResponseEntity.ok("Pedido finalizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao finalizar pedido: " + e.getMessage());
        }
    }


   
}
