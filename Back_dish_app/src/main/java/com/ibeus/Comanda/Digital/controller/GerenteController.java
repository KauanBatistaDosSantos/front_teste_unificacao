package com.ibeus.Comanda.Digital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibeus.Comanda.Digital.model.Gerente;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.service.GerenteService;
import com.ibeus.Comanda.Digital.service.PedidoService;

@RestController
@RequestMapping("/gerente")
public class GerenteController {

    @Autowired
    private GerenteService gerenteService;
     @Autowired
    private PedidoService pedidoService;
    


    // Endpoint para criar um novo gerente
    @PostMapping
    public Gerente criarGerente(@RequestBody Gerente gerente) {
        return gerenteService.salvarGerente(gerente);
    }


    @PutMapping("/pedido/{id}/avancarStatus")
    public ResponseEntity<String> avancarStatusPedido(@PathVariable Long id) {
        try {
            String response = gerenteService.avancarStatusPedido(id);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }


    @PutMapping("/pedido/{id}/retrocederStatus")
    public ResponseEntity<String> retrocederStatusPedido(@PathVariable Long id) {
        try {
            String response = gerenteService.retrocederStatusPedido(id);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
 
    }
    @PutMapping("/atribuirMotoboy")
    public Pedido atribuirMotoboyAoPedido(@RequestParam Long pedidoId, @RequestParam Long motoboyId) {
        return gerenteService.atribuirMotoboyAoPedido(pedidoId, motoboyId);
    }
}
