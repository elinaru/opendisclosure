OpenDisclosure.Views.Rules = Backbone.View.extend({

  template: _.template("\
           <section id='rules'>\
           <h1>Oakland Campaign Finance Rules</h1>\
           <p class='rules'>\
           Any “person” may contribute up to $700* to each candidate per election cycle. “Broad-based political committees” may contribute up to $1400* to each candidate per election cycle (<a href='https://library.municode.com/HTML/16308/level3/TIT3MUEL_CH3.12THOACAREAC_ARTIIICOLI.html#TIT3MUEL_CH3.12THOACAREAC_ARTIIICOLI_3.12.050LICOPE'> Oakland Campaign Reform Act (OCRA) 3.12.050</a>).</p>\
           <p class='rules'>\
           “Person” means an individual, proprietorship, firm, partnership, joint venture, syndicate, business, trust, company, corporation, association, committee, and any other organization or group of persons acting in concert (<a href='https://library.municode.com/HTML/16308/level3/TIT3MUEL_CH3.12THOACAREAC_ARTIIDE.html#TIT3MUEL_CH3.12THOACAREAC_ARTIIDE_3.12.040INAC'>OCRA 3.12.040</a>).</p>\
           <p class='rules'>\
           ”Broad-based political committee” means a committee of persons which has been in existence for more than six months, receives contributions from one hundred (100) or more persons, and acting in concert makes contributions to five or more candidates (<a href='https://library.municode.com/HTML/16308/level3/TIT3MUEL_CH3.12THOACAREAC_ARTIIDE.html#TIT3MUEL_CH3.12THOACAREAC_ARTIIDE_3.12.040INAC'>OCRA 3.12.040</a>).</p>\
           <p class='rules'>\
           *Candidates may accept this higher contribution limit ONLY IF they accept the <a href='http://www2.oaklandnet.com/oakca1/groups/cityclerk/documents/webcontent/oak045203.pdf'>OCRA expenditure ceilings</a> by submitting the <a href='http://www2.oaklandnet.com/oakca1/groups/cityclerk/documents/webcontent/oak045769.pdf'>OCRA Form 301</a>. If the candidate does not accept the expenditure ceilings then the limit for persons is $100 and the limit for broad-based political committees is $250.</p>\
           <p class='rules'>\
           For more information on Oakland’s campaign finance rules, please review the Oakland Campaign Reform Act (<a href='https://library.municode.com/HTML/16308/level1/TIT3MUEL.html#TOPTITLE'>OCRA</a>) and the Public Ethics Commission’s <a href='http://www2.oaklandnet.com/oakca1/groups/ceda/documents/report/oak045165.pdf'>Guide to OCRA</a>.</p>\
           <p class='rules'>\
           Contact the <a href='http://www2.oaklandnet.com/Government/o/CityAdministration/d/PublicEthics/index.htm'>City of Oakland Public Ethics Commission</a> with any questions at <a href='mailto:ethicscommission@oaklandnet.com'>ethicscommission@oaklandnet.com</a> or (510) 238-3593. </p>\
           </section>\
     "),

  initialize: function(){
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  }
});
