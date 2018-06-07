/**
 * --------------------------------------------
 * Whitebox Dashboard
 * License MIT
 * --------------------------------------------
 */

;(function( $, window, document, undefined ) {
		var Dashboard = function( elem, options ) {
			this.elem = elem;
			this.$elem = $(elem);
			this.options = options;
			this.metadata = this.$elem.data( "plugin-options" );
		};
		var $container;

		var Classes = {
			sideMenuExpanded: "side-menu-expanded",
			sideMenuFull: 'side-menu-full',
		};

		Dashboard.prototype = {
			defaults: {
				fullWidth: 480,
				autoExpandWidth: 768
			},

			init: function() {
				var $this = this;
				$container = $(this.elem);

				this.config = $.extend({}, this.defaults, this.options, this.metadata);

				$container.addClass("whitebox-dashboard");
				$('[data-toggle="side-menu"]').click(function(e) {
					e.preventDefault();
					$this.toggleSideMenu();
				});
				$('[data-expand="side-menu"]').click(function(e) {
					e.preventDefault();
					$this.expandSideMenu();
				});
				$('[data-collapse="side-menu"]').click(function(e) {
					e.preventDefault();
					$this.collapseSideMenu();
				});
				$(window).bind("resize", function() {
					$this._onResize();
				});
				this._onResize();

				return this;
			},

			_onResize: function() {
				width = window.innerWidth;

				if (width > this.config.fullWidth) {
					$container.addClass(Classes.sideMenuFull);
					if (width > this.config.autoExpandWidth)
						this.expandSideMenu();
					else
						this.collapseSideMenu();
				} else {
					$container.removeClass(Classes.sideMenuFull);
					this.collapseSideMenu();
				}
			},

			toggleSideMenu: function() {
				$container.trigger("side-menu:toggle");

				if ($container.hasClass(Classes.sideMenuExpanded)) {
					this.collapseSideMenu();
				} else {
					this.expandSideMenu();
				}
			},

			collapseSideMenu: function() {
				$container.trigger("side-menu:collapse");
				$container.removeClass(Classes.sideMenuExpanded);
			},

			expandSideMenu: function() {
				$container.trigger("side-menu:expand");
				$container.addClass(Classes.sideMenuExpanded);
			},
		}

		Dashboard.defaults = Dashboard.prototype.defaults;

		$.fn.dashboard = function(options) {
			return this.each(function() {
				new Dashboard(this, options).init();
			});
		};
	})( jQuery, window , document );