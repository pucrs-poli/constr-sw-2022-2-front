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
  curriculo: ICurriculo[];
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
        'Livro: S.O.L.I.D',
        'Artigo: Melhores Práticas em Microsserviços',
        'Livro: Microsserviços Prontos Para a Produção: Construindo Sistemas Padronizados em uma Organização de Engenharia de Software',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
        {
          idCurriculo: 7820,
          nomeCurso: 'Foguete Não Tem Ré',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
      ],
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro: Engenharia de Software Moderna',
        'Livro: Engenharia de Software na Prática',
        'Livro: Experimentation in Software Engineering',
        'Livro: Engenharia Experimental de Software volume 1',
        'Livro: Engenharia Experimental de Software volume 2',
        'Livro: Pair Programming Practice',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
      ],
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 4,
      programa: 'Programação',
      itensBlibliograficos: [
        'Livro: A Linguagem de Programação Go',
        'Livro: Hands-On Software Engineering with Golang',
        'Livro: The Little Book of Semaphores',
        'Livro: Principles of Concurrent and Distributed Programming',
        'Livro: Programação Paralela e Distribuída (com MPI, OpenMP e OpenACC para computação de alto desempenho)',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '05/08/2022',
          dataFimVigencia: '08/12/2022',
        },
      ],
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Modelagem de banco de dados',
      itensBlibliograficos: [
        'Livro: Modelagem De Dados',
        'Livro: Banco de Dados Projeto e Implementação',
        'Livro: Banco de dados: Teoria e Desenvolvimento',
        'Livro: Projeto e Modelagem de Banco de Dados 3a Edição',
        'Livro: Projeto e Modelagem de Banco de Dados 4a Edição',
        'Livro: Projeto e Modelagem de Banco de Dados 5a Edição',
        'Livro: Introdução a Sistemas de Bancos de Dados',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '05/08/2022',
          dataFimVigencia: '08/12/2022',
        },
      ],
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programação (IA)',
      itensBlibliograficos: [
        'Livro: Artificial Intelligence Basics',
        'Livro: Python Machine Learning',
        'Livro: Introdução à Inteligência Artificial: Uma abordagem não técnina',
        'Livro: Inteligência Artificial - Uma Abordagem de Aprendizado de Máquina',
        'Livro: Algorithms (IA)',
        'Livro: Algoritmos - Teoria e Prática (IA)',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'UI/UX Design',
      itensBlibliograficos: [
        'Livro: UX Design: Guia Definitivo com as Melhores Práticas de UX',
        'Livro: Designing Interfaces: Patterns for Effective Interaction Design',
        'Livro: Design de Interfaces: Introdução',
        'Livro: Introdução e boas práticas em UX Design',
        'Livro: Designing Interfaces',
        'Livro: 101 Design Methods',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Práticas lógicas',
      itensBlibliograficos: [
        'Livro: Lógica Para Computação',
        'Livro: Decisões Inteligentes',
        'Livro: Aprendendo Lógica',
        'Livro: O Grande Livro de Raciocínio Lógico',
        'Livro: Introdução à Lógica Matemática',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
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
        'Livro: S.O.L.I.D',
        'Artigo: Melhores Práticas em Microsserviços',
        'Livro: Microsserviços Prontos Para a Produção: Construindo Sistemas Padronizados em uma Organização de Engenharia de Software',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
        {
          idCurriculo: 7820,
          nomeCurso: 'Foguete Não Tem Ré',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
      ],
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro: Engenharia de Software Moderna',
        'Livro: Engenharia de Software na Prática',
        'Livro: Experimentation in Software Engineering',
        'Livro: Engenharia Experimental de Software volume 1',
        'Livro: Engenharia Experimental de Software volume 2',
        'Livro: Pair Programming Practice',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2022',
          dataFimVigencia: '05/07/2022',
        },
      ],
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 4,
      programa: 'Programação',
      itensBlibliograficos: [
        'Livro: A Linguagem de Programação Go',
        'Livro: Hands-On Software Engineering with Golang',
        'Livro: The Little Book of Semaphores',
        'Livro: Principles of Concurrent and Distributed Programming',
        'Livro: Programação Paralela e Distribuída (com MPI, OpenMP e OpenACC para computação de alto desempenho)',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '05/08/2022',
          dataFimVigencia: '08/12/2022',
        },
      ],
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Modelagem de banco de dados',
      itensBlibliograficos: [
        'Livro: Modelagem De Dados',
        'Livro: Banco de Dados Projeto e Implementação',
        'Livro: Banco de dados: Teoria e Desenvolvimento',
        'Livro: Projeto e Modelagem de Banco de Dados 3a Edição',
        'Livro: Projeto e Modelagem de Banco de Dados 4a Edição',
        'Livro: Projeto e Modelagem de Banco de Dados 5a Edição',
        'Livro: Introdução a Sistemas de Bancos de Dados',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '05/08/2022',
          dataFimVigencia: '08/12/2022',
        },
      ],
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programação (IA)',
      itensBlibliograficos: [
        'Livro: Artificial Intelligence Basics',
        'Livro: Python Machine Learning',
        'Livro: Introdução à Inteligência Artificial: Uma abordagem não técnina',
        'Livro: Inteligência Artificial - Uma Abordagem de Aprendizado de Máquina',
        'Livro: Algorithms (IA)',
        'Livro: Algoritmos - Teoria e Prática (IA)',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'UI/UX Design',
      itensBlibliograficos: [
        'Livro: UX Design: Guia Definitivo com as Melhores Práticas de UX',
        'Livro: Designing Interfaces: Patterns for Effective Interaction Design',
        'Livro: Design de Interfaces: Introdução',
        'Livro: Introdução e boas práticas em UX Design',
        'Livro: Designing Interfaces',
        'Livro: 101 Design Methods',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Práticas lógicas',
      itensBlibliograficos: [
        'Livro: Lógica Para Computação',
        'Livro: Decisões Inteligentes',
        'Livro: Aprendendo Lógica',
        'Livro: O Grande Livro de Raciocínio Lógico',
        'Livro: Introdução à Lógica Matemática',
      ],
      curriculo: [
        {
          idCurriculo: 4630,
          nomeCurso: 'Engenharia de Software',
          dataInicioVigencia: '03/03/2021',
          dataFimVigencia: '05/07/2021',
        },
      ],
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
