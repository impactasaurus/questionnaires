import React from "react"
import { graphql } from 'gatsby'
import Container from 'react-bootstrap/Container';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from '../components/hero'
import Links, { ILink } from "../components/questionnaire/links"
import Legal from "../components/questionnaire/legal"
import Questions, { IQuestion } from "../components/questionnaire/questions"
import Scores, { IScore } from "../components/questionnaire/scorings"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

interface IProps {
  pageContext: {
    id: string;
  }
  data: {
    softoutcomes: {
      questionnaire: {
        id: string;
        name: string;
        description: string;
        links: ILink[];
        attribution?: string;
        license: string;
        instructions?: string;
        questions: IQuestion[];
        scorings?: IScore[];
      }
    }
  }
}

const Questionnaire = (props: IProps) => {
  const questionnaire = props.data.softoutcomes.questionnaire;
  return (
    <Layout>
      <SEO title={questionnaire.name}/>
      <Hero mini={true}>
        <h2>{questionnaire.name}</h2>
        <p>{questionnaire.description}</p>
      </Hero>
      <Container fluid style={{
        marginTop: "1rem",
        marginBottom: "1rem"
      }}>
        <Row>
          <Col xl={3} lg={{span: 4, order: 0}} md={{span: 12, order: 2}}>
            <Links links={questionnaire.links} />
            <Legal license={questionnaire.license} attribution={questionnaire.attribution} />
          </Col>
          <Col>
            <Questions questions={questionnaire.questions} instructions={questionnaire.instructions} />
            <Scores scores={questionnaire.scorings} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Questionnaire

export const pageQuery = graphql`
  query($id: String!) {
    softoutcomes {
      questionnaire(id:$id) {
        id
        name
        description
        license
        attribution
        instructions
        links {
          name
          url
          description
        }
        questions {
          question
        }
        scorings {
          name 
        }
      }
    }
  }
`;
