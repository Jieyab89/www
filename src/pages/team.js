import React from 'react'
import { graphql } from 'gatsby'
import GatsbyConfig from '../../gatsby-config'
import CustomHelmet from '../components/CustomHelmet';
import Layout from '../components/indexLayout'
import MemberCard from '../components/member_card'

function getMembers(data) {
  let members = []

  let memberList = data.allMarkdownRemark.edges

  memberList.map(element => {
    return members.push(
      <MemberCard
        username={element.node.frontmatter.username}
        full_name={element.node.frontmatter.name}
        designation={element.node.frontmatter.designation}
      />
    )
  })

  return members
}

const TeamsPage = ({ data }) => (
  <Layout>
    <CustomHelmet page={GatsbyConfig.siteMetadata.team} />
    <div className="page">
      <div className="container">
        <h2>Co-ordinators</h2>
        <div className="team-section">
          {/* Card for coordinators */}
           
          <MemberCard
            username="restuhaqza"
            full_name="Restu Haqza"
            designation="Regional Coordinator"
          />
          <MemberCard
            username="edytk"
            full_name="Edy Tama Kusumajaya"
            designation="Regional Coordinator"
          />
        </div>
        <h2>Core Members</h2>
        <div className="team-section">{getMembers(data)}</div>
      </div>
    </div>
  </Layout>
)

export default TeamsPage



export const teamQuery = graphql`
  query membersQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___designation], order: ASC }
      filter: { fileAbsolutePath: { regex: "/members/.*md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            username
            name
            designation
          }
        }
      }
    }
    imageCoord1: file(relativePath: { eq: "images/prakhyath_rai.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }

`


