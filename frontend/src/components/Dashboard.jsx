import React, { useState, useEffect } from 'react';
import { Title, Button, Group, Modal, Card, Text, LoadingOverlay, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import FinanceTable from './FinanceTable';
import FinanceForm from './FinanceForm';
import api from '../api';

export default function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  
  const [sort, setSort] = useState({ key: 'date', direction: 'desc' });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get(`?sort=${sort.key},${sort.direction}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Failed to fetch records", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [sort]);

  const handleSort = (key, direction) => {
    setSort({ key, direction });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingRecord) {
        await api.put(`/${editingRecord.id}`, values);
      } else {
        await api.post('', values);
      }
      closeModal();
      fetchRecords();
    } catch (error) {
      console.error("Failed to save record", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/${id}`);
        fetchRecords();
      } catch (error) {
        console.error("Failed to delete record", error);
      }
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    open();
  };

  const closeModal = () => {
    setEditingRecord(null);
    close();
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: '80vh', position: 'relative' }}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      
      <Group justify="space-between" mb="xl">
        <Stack gap={0}>
          <Title order={2}>Finance Dashboard</Title>
          <Text c="dimmed" size="sm">Manage your income and expenses efficiently.</Text>
        </Stack>
        <Button leftSection={<IconPlus size={16} />} onClick={open} color="indigo" radius="md">
          Add Record
        </Button>
      </Group>

      {records.length > 0 ? (
        <FinanceTable 
          data={records} 
          currentSort={sort} 
          onSort={handleSort} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ) : (
        <Center style={{ height: 200 }}>
          <Stack align="center" gap="xs">
            <Text c="dimmed">No finance records found.</Text>
            <Button variant="light" onClick={open}>Create your first record</Button>
          </Stack>
        </Center>
      )}

      <Modal 
        opened={opened} 
        onClose={closeModal} 
        title={editingRecord ? 'Edit Record' : 'New Record'}
        size="lg"
      >
        <FinanceForm 
          initialValues={editingRecord} 
          onSubmit={handleSubmit} 
          onClose={closeModal} 
        />
      </Modal>
    </Card>
  );
}
