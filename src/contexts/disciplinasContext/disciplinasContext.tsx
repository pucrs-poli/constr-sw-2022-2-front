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
      programa: 'Programação (Reutilização)',
      itensBlibliograficos: [
        'Livro: Clean Code',
        'Livro: Learning JavaScript Design Patterns',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2022',
        dataFimVigencia: '05/07/2022',
      },
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro: Engenharia de Software Moderna',
        'Livro: Engenharia de Software na Prática',
        'Livro: Experimentation in Software Engineering'
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2022',
        dataFimVigencia: '05/07/2022',
      },
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 4,
      programa: 'Programação',
      itensBlibliograficos: [
        'Livro: Hands-On Software Engineering with Golang',
        'Livro: The Little Book of Semaphores',
        'Livro: Principles of Concurrent and Distributed Programming'
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '05/08/2022',
        dataFimVigencia: '08/12/2022',
      },
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Modelagem de banco de dados',
      itensBlibliograficos: [
        'Livro: Modelagem De Dados ',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '05/08/2022',
        dataFimVigencia: '08/12/2022',
      },
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programação (IA)',
      itensBlibliograficos: [
        'Livro: Artificial Intelligence Basics',
        'Livro: Python Machine Learning',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
      },
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'UI/UX Design',
      itensBlibliograficos: [
        'Livro: UX Design: Guia Definitivo com as Melhores Práticas de UX',
        'Livro: Designing Interfaces: Patterns for Effective Interaction Design',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
      },
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Práticas lógicas',
      itensBlibliograficos: [
        'Livro: Lógica Para Computação',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
      },
    },
  ]);

  const [store, setStore] = useState([
    {
      id: '1',
      nome: 'Construção de Software',
      creditos: 4,
      programa: 'Programação (Reutilização)',
      itensBlibliograficos: [
        'Livro: Clean Code',
        'Livro: Learning JavaScript Design Patterns',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2022',
        dataFimVigencia: '05/07/2022',
      },
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro: Engenharia de Software Moderna',
        'Livro: Engenharia de Software na Prática',
        'Livro: Experimentation in Software Engineering'
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2022',
        dataFimVigencia: '05/07/2022',
      },
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 4,
      programa: 'Programação',
      itensBlibliograficos: [
        'Livro: Hands-On Software Engineering with Golang',
        'Livro: The Little Book of Semaphores',
        'Livro: Principles of Concurrent and Distributed Programming'
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '05/08/2022',
        dataFimVigencia: '08/12/2022',
      },
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Modelagem de banco de dados',
      itensBlibliograficos: [
        'Livro: Modelagem De Dados ',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '05/08/2022',
        dataFimVigencia: '08/12/2022',
      },
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programação (IA)',
      itensBlibliograficos: [
        'Livro: Artificial Intelligence Basics',
        'Livro: Python Machine Learning',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
      },
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'UI/UX Design',
      itensBlibliograficos: [
        'Livro: UX Design: Guia Definitivo com as Melhores Práticas de UX',
        'Livro: Designing Interfaces: Patterns for Effective Interaction Design',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
      },
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Práticas lógicas',
      itensBlibliograficos: [
        'Livro: Lógica Para Computação',
      ],
      curriculo: {
        idCurriculo: 4630,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '03/03/2021',
        dataFimVigencia: '05/07/2021',
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
