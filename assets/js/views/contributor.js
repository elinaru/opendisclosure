OpenDisclosure.Views.Contributor = Backbone.View.extend({
  template: _.template(' \
    <div id="contirbutor">\
    <div class="col-sm-12 contribution"><a href="<%= contribution.recipientLinkPath() %>">\
    <span class="col-sm-6"><%= contribution.attributes.recipient.name %></span>\
    <span class="col-sm-2"><%= OpenDisclosure.friendlyMoney(contribution.attributes.amount) %> </span>\
    <span class="col-sm-4"><%= moment(contribution.attributes.date).format("MMM-DD-YY") %></span>\
                       </a></div></div>'),

    header: _.template('\
         <div class="col-sm-12">\
           <h1><%= contributorName %></h1>\
         </div>\
         <div class="contributions clearfix"></div>'),

  initialize: function(options) {
    _.bindAll(this, 'render', 'renderContribution');

    this.options = options;

    this.collection = new OpenDisclosure.Contributors([], {
      contributor: this.options.contributorId,
      search: this.options.search
    });
    this.collection.fetch({ success: this.render });
  },

  contributorName: function() {
    return this.collection.at(0).get('contributor').name;
  },

  render: function() {
    this.$el.html('<div id="search"></div>\
	     <div class="data"></div>');

    new OpenDisclosure.Search({
      el : "#search"
    });

    if (this.collection.length > 0) {
      if (this.options.search) {
	this.collection.sort();
      }
      this.name = this.contributorName();
      this.$('.data').html(this.header({ contributorName: this.name }));
      this.$('.contributions').html(this.collection.map(this.renderContribution));
    } else {
      this.$('.data').empty();
    }

  },

  renderContribution: function(c) {
    var contribution = new OpenDisclosure.Contribution(c.attributes);

    var ret = "";
    if (this.name != c.attributes.contributor.name) {
      this.name = c.attributes.contributor.name;
      ret = this.header({ contributorName: this.name });
    }
    return ret + this.template({ contribution: contribution });
  }
});
