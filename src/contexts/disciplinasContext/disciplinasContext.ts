import { IDisciplina } from "pages/disciplinas/disciplinas";
import { useState } from "react";

const disciplinasContext = () => {
    const db: IDisciplina[] = [
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
      ];

    const [disciplinas, setDisciplinas] = useState(db);

    return {disciplinas, setDisciplinas}
}

export default disciplinasContext;