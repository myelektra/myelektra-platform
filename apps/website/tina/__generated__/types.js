export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  title
  description
  ogImage
  draft
  body
}
    `;
export const SolutionPartsFragmentDoc = gql`
    fragment SolutionParts on Solution {
  __typename
  title
  price
  description
  icon
  isPopular
  bestFor
  cta
  metaTitle
  metaDescription
  steps {
    __typename
    title
    description
  }
  body
}
    `;
export const IndustryPartsFragmentDoc = gql`
    fragment IndustryParts on Industry {
  __typename
  title
  description
  icon
  metaTitle
  metaDescription
  personas {
    __typename
    name
    description
  }
  body
}
    `;
export const NavigationPartsFragmentDoc = gql`
    fragment NavigationParts on Navigation {
  __typename
  desktop {
    __typename
    label
    path
    submenu {
      __typename
      label
      path
    }
  }
  headerCta
  headerCtaPath
  hideFromNav
}
    `;
export const BrandPartsFragmentDoc = gql`
    fragment BrandParts on Brand {
  __typename
  company
  domain
  tagline
  subTagline
  positioning
  phone
  email
  address {
    __typename
    line1
    line2
    country
  }
  hours
  social {
    __typename
    linkedin
    instagram
  }
  founder {
    __typename
    name
    title
    photo
    linkedin
    instagram
  }
  logo {
    __typename
    file
  }
}
    `;
export const FooterPartsFragmentDoc = gql`
    fragment FooterParts on Footer {
  __typename
  columns {
    __typename
    title
    type
    links {
      __typename
      label
      path
      highlight
    }
  }
  copyright
}
    `;
export const GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  floatingCta {
    __typename
    text
    buttonLabel
    buttonPath
    showAfterScrollPx
  }
  backToTop {
    __typename
    showAfterScrollPx
  }
  cookieBanner {
    __typename
    text
    acceptLabel
    learnMoreLabel
  }
  scrollAnimation {
    __typename
    enabled
  }
  disclaimer
}
    `;
export const ClientLogoPartsFragmentDoc = gql`
    fragment ClientLogoParts on ClientLogo {
  __typename
  title
  logo
  website
  order
}
    `;
export const CountryPartsFragmentDoc = gql`
    fragment CountryParts on Country {
  __typename
  title
  flagAccent
  personas {
    __typename
    name
  }
  order
}
    `;
export const WhyMyelektraPartsFragmentDoc = gql`
    fragment WhyMyelektraParts on WhyMyelektra {
  __typename
  title
  description
  icon
  order
}
    `;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export const SolutionDocument = gql`
    query solution($relativePath: String!) {
  solution(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SolutionParts
  }
}
    ${SolutionPartsFragmentDoc}`;
export const SolutionConnectionDocument = gql`
    query solutionConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SolutionFilter) {
  solutionConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SolutionParts
      }
    }
  }
}
    ${SolutionPartsFragmentDoc}`;
export const IndustryDocument = gql`
    query industry($relativePath: String!) {
  industry(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...IndustryParts
  }
}
    ${IndustryPartsFragmentDoc}`;
export const IndustryConnectionDocument = gql`
    query industryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: IndustryFilter) {
  industryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...IndustryParts
      }
    }
  }
}
    ${IndustryPartsFragmentDoc}`;
export const NavigationDocument = gql`
    query navigation($relativePath: String!) {
  navigation(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NavigationParts
  }
}
    ${NavigationPartsFragmentDoc}`;
export const NavigationConnectionDocument = gql`
    query navigationConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NavigationFilter) {
  navigationConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NavigationParts
      }
    }
  }
}
    ${NavigationPartsFragmentDoc}`;
export const BrandDocument = gql`
    query brand($relativePath: String!) {
  brand(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BrandParts
  }
}
    ${BrandPartsFragmentDoc}`;
export const BrandConnectionDocument = gql`
    query brandConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BrandFilter) {
  brandConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BrandParts
      }
    }
  }
}
    ${BrandPartsFragmentDoc}`;
export const FooterDocument = gql`
    query footer($relativePath: String!) {
  footer(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FooterParts
  }
}
    ${FooterPartsFragmentDoc}`;
export const FooterConnectionDocument = gql`
    query footerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FooterFilter) {
  footerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FooterParts
      }
    }
  }
}
    ${FooterPartsFragmentDoc}`;
export const GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
export const GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
export const ClientLogoDocument = gql`
    query clientLogo($relativePath: String!) {
  clientLogo(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ClientLogoParts
  }
}
    ${ClientLogoPartsFragmentDoc}`;
export const ClientLogoConnectionDocument = gql`
    query clientLogoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ClientLogoFilter) {
  clientLogoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ClientLogoParts
      }
    }
  }
}
    ${ClientLogoPartsFragmentDoc}`;
export const CountryDocument = gql`
    query country($relativePath: String!) {
  country(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CountryParts
  }
}
    ${CountryPartsFragmentDoc}`;
export const CountryConnectionDocument = gql`
    query countryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CountryFilter) {
  countryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CountryParts
      }
    }
  }
}
    ${CountryPartsFragmentDoc}`;
export const WhyMyelektraDocument = gql`
    query whyMyelektra($relativePath: String!) {
  whyMyelektra(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WhyMyelektraParts
  }
}
    ${WhyMyelektraPartsFragmentDoc}`;
export const WhyMyelektraConnectionDocument = gql`
    query whyMyelektraConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WhyMyelektraFilter) {
  whyMyelektraConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WhyMyelektraParts
      }
    }
  }
}
    ${WhyMyelektraPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    solution(variables, options) {
      return requester(SolutionDocument, variables, options);
    },
    solutionConnection(variables, options) {
      return requester(SolutionConnectionDocument, variables, options);
    },
    industry(variables, options) {
      return requester(IndustryDocument, variables, options);
    },
    industryConnection(variables, options) {
      return requester(IndustryConnectionDocument, variables, options);
    },
    navigation(variables, options) {
      return requester(NavigationDocument, variables, options);
    },
    navigationConnection(variables, options) {
      return requester(NavigationConnectionDocument, variables, options);
    },
    brand(variables, options) {
      return requester(BrandDocument, variables, options);
    },
    brandConnection(variables, options) {
      return requester(BrandConnectionDocument, variables, options);
    },
    footer(variables, options) {
      return requester(FooterDocument, variables, options);
    },
    footerConnection(variables, options) {
      return requester(FooterConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    },
    clientLogo(variables, options) {
      return requester(ClientLogoDocument, variables, options);
    },
    clientLogoConnection(variables, options) {
      return requester(ClientLogoConnectionDocument, variables, options);
    },
    country(variables, options) {
      return requester(CountryDocument, variables, options);
    },
    countryConnection(variables, options) {
      return requester(CountryConnectionDocument, variables, options);
    },
    whyMyelektra(variables, options) {
      return requester(WhyMyelektraDocument, variables, options);
    },
    whyMyelektraConnection(variables, options) {
      return requester(WhyMyelektraConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
