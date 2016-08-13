export default _ => ({ // eslint-disable-line

  // link file UUID
  id: '39b2bb28-5ff2-11e6-ae3f-77baadeb1c93',

  // canonical URL of the published page
  // https://ig.ft.com/sites/molympics get filled in by the ./configure script
  url: 'https://ig.ft.com/mo-farah-races-a-t-rex/',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2016-08-12T12:00:00Z'),

  headline: 'Who (or what) is faster than Mo Farah?',

  summary: 'Runners, swimmers, cyclists and animals: race them all against the Olympic champion at full speed',

  topic: {
    name: 'Olympic Games',
    url: 'http://www.ft.com/rio-olympics',
  },

  // relatedArticle: {
  //   text: 'Related article »',
  //   url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  // },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'Alan Smith', url: 'https://twitter.com/theboysmithy' },
    { name: 'David Blood', url: 'https://twitter.com/davidbjourno' },
  ],

  // Appears in the HTML <title>
  title: '',

  // meta data
  description: 'Runners, swimmers, cyclists and animals: race them all against the Olympic champion at full speed',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  image: 'https://image.webservices.ft.com/v1/images/raw/ftcms:0f13bde2-609f-11e6-ae3f-77baadeb1c93?source=ig',

  // optional social meta data
  // twitterCreator: '@individual's_account',
  // tweetText:  '',
  // socialHeadline: '',
  // socialSummary:  '',

  onwardjourney: {

    // list (methode list) or topic
    type: '',

    // topic or list id
    id: '',

    // a heading is provided automatically if not set (peferred)
    heading: '',
  },

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
