import React from 'react';
import { Table, Badge, ActionIcon, Group, Text } from '@mantine/core';
import { IconEdit, IconTrash, IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import dayjs from 'dayjs';

export default function FinanceTable({ data, onEdit, onDelete, onSort, currentSort }) {
  const columns = [
    { key: "userName", label: "User Name" },
    { key: "type", label: "Type" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (currentSort.key === key && currentSort.direction === 'asc') {
      direction = 'desc';
    }
    onSort(key, direction);
  };

  const getSortIcon = (key) => {
    if (currentSort.key !== key) return null;
    return currentSort.direction === 'asc' ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />;
  };

  const rows = data.map((record) => (
    <Table.Tr key={record.id}>
      <Table.Td>{record.userName}</Table.Td>
      <Table.Td>
        <Badge color={record.type === 'INCOME' ? 'green' : 'red'} variant="light">
          {record.type}
        </Badge>
      </Table.Td>
      <Table.Td>{record.category}</Table.Td>
      <Table.Td>
        <Text c={record.type === 'INCOME' ? 'green' : 'red'} fw={600}>
          ${record.amount.toFixed(2)}
        </Text>
      </Table.Td>
      <Table.Td>{dayjs(record.date).format('MMM D, YYYY')}</Table.Td>
      <Table.Td>
        <Group gap="sm">
          <ActionIcon variant="subtle" color="blue" onClick={() => onEdit(record)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => onDelete(record.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key} style={{ cursor: 'pointer' }} onClick={() => handleSort(col.key)}>
                <Group gap="xs" wrap="nowrap">
                  {col.label} {getSortIcon(col.key)}
                </Group>
              </Table.Th>
            ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
