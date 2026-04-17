package com.finance.app.service;

import com.finance.app.model.FinanceRecord;
import com.finance.app.repository.FinanceRecordRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FinanceRecordService {

    private final FinanceRecordRepository repository;

    public FinanceRecord createRecord(FinanceRecord record) {
        return repository.save(record);
    }

    public FinanceRecord updateRecord(Long id, FinanceRecord recordDetails) {
        FinanceRecord existingRecord = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found with id: " + id));

        existingRecord.setUserName(recordDetails.getUserName());
        existingRecord.setType(recordDetails.getType());
        existingRecord.setCategory(recordDetails.getCategory());
        existingRecord.setAmount(recordDetails.getAmount());
        existingRecord.setDescription(recordDetails.getDescription());
        existingRecord.setDate(recordDetails.getDate());

        return repository.save(existingRecord);
    }

    public void deleteRecord(Long id) {
        repository.deleteById(id);
    }

    public List<FinanceRecord> getAllRecords(Sort sort) {
        return repository.findAll(sort);
    }

    public FinanceRecord getRecordById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found with id: " + id));
    }
}
