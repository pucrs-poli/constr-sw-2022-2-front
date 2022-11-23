import { SpeedDial, SpeedDialAction } from '@mui/material';

const actions = [
  { name: 'Adicionar um recurso' },
  { name: 'Adicionar um novo tipo de recurso' },
];
const sla = 'Adicionar Tipo/Recurso';

export default function SpeedDialCustom() {
  return (
    <SpeedDial
      FabProps={{
        variant: 'extended',
        style: {
          height: 50,
        },
      }}
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      ariaLabel='SpeedDial basic example'
      icon={sla}
    >
      {actions.map((action) => (
        <SpeedDialAction
          FabProps={{
            variant: 'extended',
            style: {
              height: 50,
            },
          }}
          key={action.name}
          icon={action.name}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
