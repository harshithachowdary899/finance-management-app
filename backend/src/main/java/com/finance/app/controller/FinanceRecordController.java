package com.finance.app.controller;

import com.finance.app.model.FinanceRecord;
import com.finance.app.service.FinanceRecordService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/finance")
@CrossOrigin(origins = "*") // Allows React frontend to hit backend locally
@RequiredArgsConstructor
public class FinanceRecordController {

    private final FinanceRecordService service;

    @PostMapping
    public ResponseEntity<FinanceRecord> createRecord(@RequestBody FinanceRecord record) {
        FinanceRecord createdRecord = service.createRecord(record);
        return new ResponseEntity<>(createdRecord, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FinanceRecord>> getAllRecords(Sort sort) {
        List<FinanceRecord> records = service.getAllRecords(sort);
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceRecord> getRecordById(@PathVariable Long id) {
        FinanceRecord record = service.getRecordById(id);
        return new ResponseEntity<>(record, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinanceRecord> updateRecord(@PathVariable Long id, @RequestBody FinanceRecord record) {
        FinanceRecord updatedRecord = service.updateRecord(id, record);
        return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        service.deleteRecord(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
