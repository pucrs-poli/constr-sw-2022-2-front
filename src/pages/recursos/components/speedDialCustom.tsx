import { SpeedDial, SpeedDialAction } from '@mui/material';

type SpeedDialCustomProps = {
  onResourceCreation?: () => void;
  onResourceTypeCreation?: () => void;
};

export default function SpeedDialCustom(props: SpeedDialCustomProps) {
  const actions = [
    { name: 'Adicionar um recurso', func: props.onResourceCreation },
    {
      name: 'Adicionar um novo tipo de recurso',
      func: props.onResourceTypeCreation,
    },
  ];
  const text = 'Adicionar Tipo/Recurso';
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
      icon={text}
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
          onClick={action.func}
        />
      ))}
    </SpeedDial>
  );
}
