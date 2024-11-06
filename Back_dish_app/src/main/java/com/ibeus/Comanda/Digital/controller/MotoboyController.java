package com.ibeus.Comanda.Digital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibeus.Comanda.Digital.model.Motoboy;
import com.ibeus.Comanda.Digital.service.MotoboyService;

@RestController
@RequestMapping("/motoboy")
public class MotoboyController {

    @Autowired
    private MotoboyService motoboyService;


    @PostMapping
    public Motoboy criarMotoboy(@RequestBody Motoboy motoboy) {
        return motoboyService.salvarMotoboy(motoboy);
    }


    @GetMapping
     public List<Motoboy> listarMotoboy() {
        return motoboyService.listarMotoboy();
    }
   

    @GetMapping("/{id}")
    public Optional<Motoboy> buscarMotoboyPorId(@PathVariable Long id) {
        return motoboyService.buscarMotoboyPorId(id);
    }
    @PutMapping("/finalizarEntrega")
    public ResponseEntity<String> finalizarEntrega(@RequestParam String cpfInicio) {
        motoboyService.finalizarEntrega(cpfInicio);
        return ResponseEntity.ok("Entrega finalizada com sucesso.");
    }
}
