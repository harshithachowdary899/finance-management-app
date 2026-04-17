import React from 'react';
import { AppShell, Container, Group, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars, IconChartPie } from '@tabler/icons-react';
import Dashboard from './components/Dashboard';

function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Group>
              <ActionIcon variant="filled" color="indigo" size="lg" radius="xl">
                <IconChartPie size={20} />
              </ActionIcon>
              <Title order={3} component="span" fw={900} lts={1}>
                FIN<span style={{ color: 'var(--mantine-color-indigo-5)' }}>MANAGE</span>
              </Title>
            </Group>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              size="lg"
              radius="md"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" mt="xl">
          <Dashboard />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
