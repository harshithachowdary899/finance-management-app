package com.finance.app.repository;

import com.finance.app.model.FinanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceRecordRepository extends JpaRepository<FinanceRecord, Long> {
}
