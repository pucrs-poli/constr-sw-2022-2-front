import { createContext, ReactNode, useState } from 'react';

export interface ICurriculo {
  idCurriculo: number;
  nomeCurso: string;
  dataInicioVigencia: string;
  dataFimVigencia: string;
}

export interface IDisciplina {
  id: string;
  nome: string;
  creditos: number;
  programa: string;
  itensBlibliograficos: string[];
  curriculo: ICurriculo;
}

export interface IDisciplinas {
  disciplinas: IDisciplina[];
  store: IDisciplina[];
  setDisciplinas: (disciplinas: IDisciplina[]) => void;
  searchDisciplinas: (searchField: string) => void;
  setStore: (disciplinas: IDisciplina[]) => void;
}

export const DisciplinasContext = createContext<IDisciplinas>({
  disciplinas: [],
  store: [],
  setDisciplinas: () => {},
  searchDisciplinas: () => {},
  setStore: () => {},
});

const DisciplinasProvider = ({ children }: { children: ReactNode }) => {
  const [disciplinas, setDisciplinas] = useState([
    {
      id: '1',
      nome: 'Construção de Software',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
  ]);

  const [store, setStore] = useState([
    {
      id: '1',
      nome: 'Construção de Software',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
  ]);

  const searchDisciplinas = (nome: string) => {
    if (nome.length === 0) {
      setDisciplinas(store);
    } else {
      setDisciplinas(
        disciplinas.filter((disciplina) => {
          return disciplina.nome.toLowerCase().includes(nome.toLowerCase());
        })
      );
    }
  };

  return (
    <DisciplinasContext.Provider
      value={{
        disciplinas,
        setDisciplinas,
        searchDisciplinas,
        setStore,
        store,
      }}
    >
      {children}
    </DisciplinasContext.Provider>
  );
};

export default DisciplinasProvider;
