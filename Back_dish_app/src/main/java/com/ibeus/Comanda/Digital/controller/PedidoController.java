package com.ibeus.Comanda.Digital.controller;

import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> getAllPedidos(){ return pedidoService.findAll();}

    @PostMapping
    public Pedido criarPedido(@RequestBody Pedido pedido){ return pedidoService.criarPedido(pedido);}

    @PutMapping("/{id}/{idPrato}/addItemPedido")
    public Pedido addItem(@PathVariable Long id, @PathVariable Long idPrato){ return pedidoService.addItem(id, idPrato); }

    @PutMapping("/{id}/updateItemPedido")
    public Pedido updateItem(@PathVariable Long id, @RequestBody Pedido detalhesPedido){ return pedidoService.update(id, detalhesPedido); }

    @PutMapping("/{id}/{idPrato}/delItemPedido")
    public Pedido deletItem(@PathVariable Long id, @PathVariable Long idPrato){ return pedidoService.deletarItem(id, idPrato); }

    @PutMapping("/{id}/obs")
    public Pedido addObs(@RequestBody String obs, @PathVariable Long id){ return pedidoService.setObs(id, obs);}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarPedido(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
