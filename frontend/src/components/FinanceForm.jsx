import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Select, Button, Group, Textarea } from '@mantine/core';

export default function FinanceForm({ onSubmit, initialValues, onClose }) {
  const form = useForm({
    initialValues: initialValues || {
      userName: '',
      type: 'INCOME',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    },
    validate: {
      userName: (value) => value.trim().length > 0 ? null : 'User name is required',
      amount: (value) => value > 0 ? null : 'Amount must be greater than 0',
      category: (value) => value.trim().length > 0 ? null : 'Category is required',
      date: (value) => value ? null : 'Date is required',
    }
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="User Name"
        placeholder="John Doe"
        {...form.getInputProps('userName')}
        mb="md"
      />
      <Select
        withAsterisk
        label="Type"
        data={[
          { value: 'INCOME', label: 'Income' },
          { value: 'EXPENSE', label: 'Expense' },
        ]}
        {...form.getInputProps('type')}
        mb="md"
      />
      <TextInput
        withAsterisk
        label="Category"
        placeholder="Salary, Groceries, etc."
        {...form.getInputProps('category')}
        mb="md"
      />
      <NumberInput
        withAsterisk
        label="Amount"
        placeholder="0.00"
        decimalScale={2}
        prefix="$ "
        {...form.getInputProps('amount')}
        mb="md"
      />
      <TextInput
        withAsterisk
        type="date"
        label="Date"
        {...form.getInputProps('date')}
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Additional notes"
        {...form.getInputProps('description')}
        mb="xl"
      />
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
}
