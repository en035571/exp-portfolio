'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'

const projects = [
  // DESIGN
  { id: 1, name: 'NYC Show Poster', client: 'AG Club', type: 'Design', year: '-', width: 220, row: 1, images: ['/projects/ag-club-nyc-show/cover.jpg', '/projects/ag-club-nyc-show/2.jpg', '/projects/ag-club-nyc-show/3.jpg'] },
  { id: 2, name: 'Raincheck Artwork', client: 'ALX', type: 'Design', year: '-', width: 230, row: 2, images: ['/projects/alx-raincheck/cover.jpg'] },
  { id: 3, name: 'Artist Logo Dev', client: 'Artemas', type: 'Design', year: '-', width: 240, row: 1, images: ['/projects/artemas-final-logos-branding-dev/cover.jpg', '/projects/artemas-final-logos-branding-dev/1.jpg', '/projects/artemas-final-logos-branding-dev/2.jpg', '/projects/artemas-final-logos-branding-dev/3.jpg', '/projects/artemas-final-logos-branding-dev/4.jpg', '/projects/artemas-final-logos-branding-dev/5.jpg', '/projects/artemas-final-logos-branding-dev/6.jpg', '/projects/artemas-final-logos-branding-dev/7.jpg', '/projects/artemas-final-logos-branding-dev/9.jpg'], subtag: 'Branding' },
  { id: 4, name: 'Merchandise Design', client: 'Artemas', type: 'Design', year: '-', width: 250, row: 2, images: ['/projects/artemas-final-merch-build/cover.png', '/projects/artemas-final-merch-build/1.png', '/projects/artemas-final-merch-build/2.png', '/projects/artemas-final-merch-build/3.png', '/projects/artemas-final-merch-build/4.png', '/projects/artemas-final-merch-build/5.png', '/projects/artemas-final-merch-build/7.png', '/projects/artemas-final-merch-build/8.png', '/projects/artemas-final-merch-build/9.png'], subtag: 'Branding' },
  { id: 5, name: 'Tour Merch + Tour Poster Design', client: 'Austin George', type: 'Design', year: '-', width: 260, row: 1, images: ['/projects/austin-george-tour-merch-poster/cover.jpg', '/projects/austin-george-tour-merch-poster/2.jpg', '/projects/austin-george-tour-merch-poster/3.jpg', '/projects/austin-george-tour-merch-poster/4.jpg'], subtag: 'Branding' },
  { id: 6, name: 'Live Show Posters', client: 'Caamp', type: 'Design', year: '-', width: 270, row: 2, images: ['/projects/caamp-live-posters/cover.png', '/projects/caamp-live-posters/1.png', '/projects/caamp-live-posters/4.png'] },
  { id: 7, name: 'SS26 Designs', client: 'Franchise', type: 'Design', year: '-', width: 280, row: 1, images: ['/projects/franchise/cover.jpg', '/projects/franchise/1.jpg', '/projects/franchise/2.jpg', '/projects/franchise/3.jpg', '/projects/franchise/4.jpg', '/projects/franchise/6.jpg', '/projects/franchise/7.jpg', '/projects/franchise/8.jpg', '/projects/franchise/9.jpg'] },
  { id: 8, name: 'SS25', client: 'Fugazi', type: 'Design', year: '-', width: 220, row: 2, images: ['/projects/fugazi-fugazi-ss25/cover.jpg', '/projects/fugazi-fugazi-ss25/1.jpg', '/projects/fugazi-fugazi-ss25/2.jpg', '/projects/fugazi-fugazi-ss25/3.jpg', '/projects/fugazi-fugazi-ss25/4.jpg', '/projects/fugazi-fugazi-ss25/5.jpg', '/projects/fugazi-fugazi-ss25/6.jpg', '/projects/fugazi-fugazi-ss25/8.jpg'] },
  { id: 9, name: 'Graphic Dev25', client: 'Fugazi', type: 'Design', year: '-', width: 230, row: 1, images: ['/projects/fugazi-fugazi-dev25/cover.jpg', '/projects/fugazi-fugazi-dev25/2.jpg', '/projects/fugazi-fugazi-dev25/3.jpg', '/projects/fugazi-fugazi-dev25/4.jpg', '/projects/fugazi-fugazi-dev25/5.jpg', '/projects/fugazi-fugazi-dev25/6.jpg', '/projects/fugazi-fugazi-dev25/7.jpg', '/projects/fugazi-fugazi-dev25/8.jpg'] },
  { id: 10, name: 'Vinyl Design', client: 'Infinite Coles', type: 'Design', year: '-', width: 240, row: 2, images: ['/projects/infinite-coles-vinyl/cover.png'] },
  { id: 11, name: 'Vinyl + Logo Design', client: 'James Tillman', type: 'Design', year: '-', width: 250, row: 1, images: ['/projects/james-tillman-vinyl-logo/cover.jpg', '/projects/james-tillman-vinyl-logo/1.jpg', '/projects/james-tillman-vinyl-logo/2.jpg', '/projects/james-tillman-vinyl-logo/3.jpg'], subtag: 'Branding' },
  { id: 12, name: 'Poster', client: 'Junior Varsity', type: 'Design', year: '-', width: 260, row: 2, images: ['/projects/junior-varsity-tour-merch-poster-poster/cover.jpg', '/projects/junior-varsity-tour-merch-poster-poster/1.jpg', '/projects/junior-varsity-tour-merch-poster-poster/2.jpg', '/projects/junior-varsity-tour-merch-poster-poster/3.jpg', '/projects/junior-varsity-tour-merch-poster-poster/4.jpg', '/projects/junior-varsity-tour-merch-poster-poster/5.jpg', '/projects/junior-varsity-tour-merch-poster-poster/7.jpg', '/projects/junior-varsity-tour-merch-poster-poster/8.jpg', '/projects/junior-varsity-tour-merch-poster-poster/9.jpg'] },
  { id: 13, name: 'Tour Merch', client: 'Junior Varsity', type: 'Design', year: '-', width: 270, row: 1, images: ['/projects/junior-varsity-tour-merch-poster-tour-merch/cover.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/1.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/3.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/4.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/5.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/6.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/7.png', '/projects/junior-varsity-tour-merch-poster-tour-merch/8.png'] },
  { id: 14, name: 'Heel Merch Dev', client: 'Leon Thomas', type: 'Design', year: '-', width: 280, row: 2, images: ['/projects/leon-thomas-heel-merch-dev/cover.png', '/projects/leon-thomas-heel-merch-dev/1.png', '/projects/leon-thomas-heel-merch-dev/3.png', '/projects/leon-thomas-heel-merch-dev/4.png', '/projects/leon-thomas-heel-merch-dev/5.png', '/projects/leon-thomas-heel-merch-dev/6.png', '/projects/leon-thomas-heel-merch-dev/7.png', '/projects/leon-thomas-heel-merch-dev/8.png', '/projects/leon-thomas-heel-merch-dev/9.png'], subtag: 'Branding' },
  { id: 15, name: 'Mutt Branding + Merch Design', client: 'Leon Thomas', type: 'Design', year: '-', width: 220, row: 1, images: ['/projects/leon-thomas-mutt-branding-merch/cover.jpg', '/projects/leon-thomas-mutt-branding-merch/1.jpg', '/projects/leon-thomas-mutt-branding-merch/2.jpg', '/projects/leon-thomas-mutt-branding-merch/4.jpg', '/projects/leon-thomas-mutt-branding-merch/5.jpg', '/projects/leon-thomas-mutt-branding-merch/6.jpg', '/projects/leon-thomas-mutt-branding-merch/7.jpg', '/projects/leon-thomas-mutt-branding-merch/8.jpg', '/projects/leon-thomas-mutt-branding-merch/9.jpg'], subtag: 'Branding' },
  { id: 16, name: 'Branding + Merch', client: 'Love Spells', type: 'Design', year: '-', width: 230, row: 2, images: ['/projects/love-spells-branding-merch/cover.png', '/projects/love-spells-branding-merch/1.png', '/projects/love-spells-branding-merch/2.png', '/projects/love-spells-branding-merch/4.png', '/projects/love-spells-branding-merch/5.png', '/projects/love-spells-branding-merch/6.png', '/projects/love-spells-branding-merch/7.png'], subtag: 'Branding' },
  { id: 17, name: 'Tour Poster', client: 'Love Spells', type: 'Design', year: '-', width: 240, row: 1, images: ['/projects/love-spells-tour-poster/cover.jpg', '/projects/love-spells-tour-poster/1.jpg'], subtag: 'Branding' },
  { id: 18, name: 'Nike Running — Collab Towel Design', client: 'Motivny', type: 'Design', year: '-', width: 250, row: 2, images: ['/projects/motivny-outddoors-nike-running/cover.png', '/projects/motivny-outddoors-nike-running/1.png', '/projects/motivny-outddoors-nike-running/2.png', '/projects/motivny-outddoors-nike-running/3.png', '/projects/motivny-outddoors-nike-running/4.png', '/projects/motivny-outddoors-nike-running/5.png', '/projects/motivny-outddoors-nike-running/6.png', '/projects/motivny-outddoors-nike-running/8.png', '/projects/motivny-outddoors-nike-running/9.png'] },
  { id: 19, name: 'Salomon — Collab Tee Design', client: 'Motivny', type: 'Design', year: '-', width: 260, row: 1, images: ['/projects/motivny-outddoors-salomon/cover.jpg', '/projects/motivny-outddoors-salomon/1.jpg', '/projects/motivny-outddoors-salomon/3.jpg', '/projects/motivny-outddoors-salomon/4.jpg', '/projects/motivny-outddoors-salomon/5.jpg', '/projects/motivny-outddoors-salomon/6.jpg', '/projects/motivny-outddoors-salomon/7.jpg'] },
  { id: 20, name: 'Brand Design', client: 'N3T', type: 'Design', year: '-', width: 270, row: 2, images: ['/projects/n3t-branding/cover.jpg', '/projects/n3t-branding/2.jpg', '/projects/n3t-branding/3.jpg', '/projects/n3t-branding/4.jpg'], subtag: 'Branding' },
  { id: 21, name: 'Tour Merch Design + Dev', client: 'Paris Texas', type: 'Design', year: '-', width: 280, row: 1, images: ['/projects/paris-texas-final-merch-designs-dev/cover.jpg', '/projects/paris-texas-final-merch-designs-dev/1.jpg', '/projects/paris-texas-final-merch-designs-dev/3.jpg', '/projects/paris-texas-final-merch-designs-dev/4.jpg', '/projects/paris-texas-final-merch-designs-dev/5.jpg', '/projects/paris-texas-final-merch-designs-dev/6.jpg', '/projects/paris-texas-final-merch-designs-dev/7.jpg', '/projects/paris-texas-final-merch-designs-dev/8.jpg', '/projects/paris-texas-final-merch-designs-dev/9.jpg'] },
  { id: 22, name: 'Rokkout Cover', client: 'Paris Texas', type: 'Design', year: '-', width: 220, row: 2, images: ['/projects/paris-texas-final-rokkout-cover-dev/cover.jpg', '/projects/paris-texas-final-rokkout-cover-dev/1.jpg', '/projects/paris-texas-final-rokkout-cover-dev/2.jpg', '/projects/paris-texas-final-rokkout-cover-dev/3.jpg', '/projects/paris-texas-final-rokkout-cover-dev/4.jpg', '/projects/paris-texas-final-rokkout-cover-dev/5.jpg', '/projects/paris-texas-final-rokkout-cover-dev/7.jpg'] },
  { id: 23, name: 'Glyph Dev + Packaging Design', client: 'Powder Mountain', type: 'Design', year: '-', width: 230, row: 1, images: ['/projects/powder-mountain-final-glyph-packaging/cover.png', '/projects/powder-mountain-final-glyph-packaging/1.png', '/projects/powder-mountain-final-glyph-packaging/2.png', '/projects/powder-mountain-final-glyph-packaging/3.png', '/projects/powder-mountain-final-glyph-packaging/5.png', '/projects/powder-mountain-final-glyph-packaging/6.png'] },
  { id: 24, name: 'Merchandise Design', client: 'Powder Mountain', type: 'Design', year: '-', width: 240, row: 2, images: ['/projects/powder-mountain-final-tee-graphics-for-portfolio/cover.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/1.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/2.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/3.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/4.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/5.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/6.png', '/projects/powder-mountain-final-tee-graphics-for-portfolio/7.png'] },
  { id: 25, name: 'Blistering Cover Art', client: 'Shye01', type: 'Design', year: '-', width: 250, row: 1, images: ['/projects/shye01-blistering-cover-art/cover.jpg', '/projects/shye01-blistering-cover-art/2.jpg', '/projects/shye01-blistering-cover-art/3.jpg'], subtag: 'Branding' },
  { id: 26, name: 'Tails Artwork', client: 'Teenage Priest', type: 'Design', year: '-', width: 260, row: 2, images: ['/projects/teenage-priest-album-artwork/cover.jpg'], subtag: 'Branding' },
  { id: 27, name: 'Singles Artwork', client: 'Teenage Priest', type: 'Design', year: '-', width: 270, row: 1, images: ['/projects/teenage-priest-singles-artwork/cover.jpg', '/projects/teenage-priest-singles-artwork/1.jpg'], subtag: 'Branding' },
  { id: 28, name: "People's Stories Vinyl Design", client: 'UMI', type: 'Design', year: '-', width: 280, row: 2, images: ['/projects/umi-peoples-stories-vinyl/cover.png', '/projects/umi-peoples-stories-vinyl/1.png', '/projects/umi-peoples-stories-vinyl/2.png', '/projects/umi-peoples-stories-vinyl/3.png', '/projects/umi-peoples-stories-vinyl/4.png', '/projects/umi-peoples-stories-vinyl/5.png', '/projects/umi-peoples-stories-vinyl/6.png', '/projects/umi-peoples-stories-vinyl/8.png', '/projects/umi-peoples-stories-vinyl/9.png'], subtag: 'Branding' },
  { id: 29, name: 'Artist Brand Package', client: 'UMI', type: 'Design', year: '-', width: 220, row: 1, images: ['/projects/umi-logos/cover.jpg', '/projects/umi-logos/1.jpg', '/projects/umi-logos/2.jpg', '/projects/umi-logos/3.jpg', '/projects/umi-logos/5.jpg', '/projects/umi-logos/6.jpg'], subtag: 'Branding' },
  { id: 30, name: 'Graphic Language', client: 'We Are Human', type: 'Design', year: '-', width: 230, row: 2, images: ['/projects/we-are-human-branding/cover.jpg', '/projects/we-are-human-branding/1.jpg', '/projects/we-are-human-branding/2.jpg', '/projects/we-are-human-branding/4.jpg'], subtag: 'Branding' },
  { id: 59, name: 'Skin & Bone Vinyl', client: 'Rocco', type: 'Design', year: '-', width: 245, row: 1, images: ['/projects/rocco-skin-bone-vinyl/cover.png', '/projects/rocco-skin-bone-vinyl/1.png', '/projects/rocco-skin-bone-vinyl/2.png', '/projects/rocco-skin-bone-vinyl/3.png', '/projects/rocco-skin-bone-vinyl/4.png'], subtag: 'Branding' },
  { id: 60, name: 'Artist Brand Package & Merch Design', client: 'Teenage Priest', type: 'Design', year: '-', width: 255, row: 2, images: ['/projects/teenage-priest-artist-brand-profile/cover.jpg', '/projects/teenage-priest-artist-brand-profile/1.jpg', '/projects/teenage-priest-artist-brand-profile/2.jpg', '/projects/teenage-priest-artist-brand-profile/3.jpg', '/projects/teenage-priest-artist-brand-profile/4.jpg', '/projects/teenage-priest-artist-brand-profile/5.jpg'], subtag: 'Branding' },
  // PHOTO
  { id: 31, name: 'Press Photos', client: 'ALX', type: 'Photo', year: '-', width: 240, row: 1, images: ['/projects/alx-press/cover.jpg', '/projects/alx-press/1.jpg', '/projects/alx-press/2.jpg', '/projects/alx-press/3.jpg', '/projects/alx-press/4.jpg', '/projects/alx-press/5.jpg', '/projects/alx-press/6.jpg', '/projects/alx-press/7.jpg'] },
  { id: 32, name: 'Press Photos', client: 'Brandon', type: 'Photo', year: '-', width: 250, row: 2, images: ['/projects/brandon-press-1/cover.jpg', '/projects/brandon-press-1/1.jpg', '/projects/brandon-press-1/2.jpg', '/projects/brandon-press-1/3.jpg', '/projects/brandon-press-1/5.jpg', '/projects/brandon-press-1/6.jpg', '/projects/brandon-press-1/7.jpg', '/projects/brandon-press-1/8.jpg', '/projects/brandon-press-1/9.jpg'] },
  { id: 33, name: 'Lookbook — Dru', client: 'FourJP', type: 'Photo', year: '-', width: 260, row: 1, images: ['/projects/fourjp-lookbook-dru/cover.jpg', '/projects/fourjp-lookbook-dru/1.jpg', '/projects/fourjp-lookbook-dru/2.jpg', '/projects/fourjp-lookbook-dru/3.jpg', '/projects/fourjp-lookbook-dru/4.jpg', '/projects/fourjp-lookbook-dru/5.jpg', '/projects/fourjp-lookbook-dru/6.jpg', '/projects/fourjp-lookbook-dru/7.jpg', '/projects/fourjp-lookbook-dru/8.jpg'] },
  { id: 58, name: 'Lookbook — Valentina', client: 'FourJP', type: 'Photo', year: '-', width: 265, row: 2, images: ['/projects/fourjp-lookbook-valentina/cover.jpg', '/projects/fourjp-lookbook-valentina/1.jpg', '/projects/fourjp-lookbook-valentina/2.jpg', '/projects/fourjp-lookbook-valentina/3.jpg', '/projects/fourjp-lookbook-valentina/4.jpg', '/projects/fourjp-lookbook-valentina/5.jpg', '/projects/fourjp-lookbook-valentina/6.jpg', '/projects/fourjp-lookbook-valentina/7.jpg', '/projects/fourjp-lookbook-valentina/8.jpg'] },
  { id: 34, name: 'Catalog Photo Campaign', client: 'Interscope Records', type: 'Photo', year: '-', width: 270, row: 2, images: ['/projects/interscope-records-artist-merch-photo-campaign/cover.jpg', '/projects/interscope-records-artist-merch-photo-campaign/2.jpg', '/projects/interscope-records-artist-merch-photo-campaign/3.jpg', '/projects/interscope-records-artist-merch-photo-campaign/4.jpg', '/projects/interscope-records-artist-merch-photo-campaign/5.jpg', '/projects/interscope-records-artist-merch-photo-campaign/6.jpg', '/projects/interscope-records-artist-merch-photo-campaign/7.jpg', '/projects/interscope-records-artist-merch-photo-campaign/8.jpg', '/projects/interscope-records-artist-merch-photo-campaign/9.jpg'] },
  { id: 35, name: 'Press Photos', client: 'Jahson Paynter', type: 'Photo', year: '-', width: 280, row: 1, images: ['/projects/jahson-paynter-press/cover.jpg', '/projects/jahson-paynter-press/2.jpg', '/projects/jahson-paynter-press/3.jpg', '/projects/jahson-paynter-press/4.jpg', '/projects/jahson-paynter-press/5.jpg', '/projects/jahson-paynter-press/6.jpg', '/projects/jahson-paynter-press/7.jpg', '/projects/jahson-paynter-press/8.jpg', '/projects/jahson-paynter-press/9.jpg'] },
  { id: 37, name: 'Press Photos 1', client: 'Noah Guy', type: 'Photo', year: '-', width: 230, row: 1, images: ['/projects/noah-guy-press-photos-1/cover.jpg', '/projects/noah-guy-press-photos-1/1.jpg', '/projects/noah-guy-press-photos-1/2.jpg', '/projects/noah-guy-press-photos-1/3.jpg', '/projects/noah-guy-press-photos-1/4.jpg', '/projects/noah-guy-press-photos-1/5.jpg', '/projects/noah-guy-press-photos-1/6.jpg', '/projects/noah-guy-press-photos-1/7.jpg', '/projects/noah-guy-press-photos-1/9.jpg'], subtag: 'Branding' },
  { id: 38, name: 'Press Photos 2', client: 'Noah Guy', type: 'Photo', year: '-', width: 240, row: 2, images: ['/projects/noah-guy-press-photos-2/cover.jpg', '/projects/noah-guy-press-photos-2/1.jpg', '/projects/noah-guy-press-photos-2/3.jpg', '/projects/noah-guy-press-photos-2/4.jpg', '/projects/noah-guy-press-photos-2/5.jpg', '/projects/noah-guy-press-photos-2/6.jpg', '/projects/noah-guy-press-photos-2/7.jpg'], subtag: 'Branding' },
  { id: 39, name: 'Press Photos 3', client: 'Noah Guy', type: 'Photo', year: '-', width: 250, row: 1, images: ['/projects/noah-guy-press-photos-3/cover.jpg', '/projects/noah-guy-press-photos-3/1.jpg', '/projects/noah-guy-press-photos-3/2.jpg', '/projects/noah-guy-press-photos-3/3.jpg', '/projects/noah-guy-press-photos-3/5.jpg', '/projects/noah-guy-press-photos-3/6.jpg', '/projects/noah-guy-press-photos-3/7.jpg', '/projects/noah-guy-press-photos-3/8.jpg', '/projects/noah-guy-press-photos-3/9.jpg'], subtag: 'Branding' },
  { id: 40, name: 'Press Photos 4', client: 'Noah Guy', type: 'Photo', year: '-', width: 260, row: 2, images: ['/projects/noah-guy-press-photos-4/cover.jpg', '/projects/noah-guy-press-photos-4/1.jpg', '/projects/noah-guy-press-photos-4/2.jpg', '/projects/noah-guy-press-photos-4/3.jpg', '/projects/noah-guy-press-photos-4/4.jpg', '/projects/noah-guy-press-photos-4/5.jpg'], subtag: 'Branding' },
  { id: 41, name: 'Press Photos', client: 'Oxis', type: 'Photo', year: '-', width: 270, row: 1, images: ['/projects/oxis-press/cover.jpg', '/projects/oxis-press/2.jpg', '/projects/oxis-press/3.jpg', '/projects/oxis-press/4.jpg', '/projects/oxis-press/5.jpg', '/projects/oxis-press/6.jpg', '/projects/oxis-press/7.jpg', '/projects/oxis-press/8.jpg', '/projects/oxis-press/9.jpg'] },
  { id: 42, name: '10 Yrs In Grey', client: 'Robert Gallardo', type: 'Photo', year: '-', width: 280, row: 2, images: ['/projects/robert-gallardo-10-yrs-in-grey/cover.jpg', '/projects/robert-gallardo-10-yrs-in-grey/2.jpg', '/projects/robert-gallardo-10-yrs-in-grey/3.jpg', '/projects/robert-gallardo-10-yrs-in-grey/4.jpg', '/projects/robert-gallardo-10-yrs-in-grey/5.jpg', '/projects/robert-gallardo-10-yrs-in-grey/6.jpg', '/projects/robert-gallardo-10-yrs-in-grey/7.jpg', '/projects/robert-gallardo-10-yrs-in-grey/8.jpg', '/projects/robert-gallardo-10-yrs-in-grey/9.jpg'] },
  { id: 43, name: 'Press Photos 1', client: 'Teenage Priest', type: 'Photo', year: '-', width: 220, row: 1, images: ['/projects/teenage-priest-press-1/cover.png', '/projects/teenage-priest-press-1/1.png', '/projects/teenage-priest-press-1/2.png', '/projects/teenage-priest-press-1/3.png', '/projects/teenage-priest-press-1/4.png', '/projects/teenage-priest-press-1/6.png', '/projects/teenage-priest-press-1/7.png', '/projects/teenage-priest-press-1/8.png', '/projects/teenage-priest-press-1/9.png'], subtag: 'Branding' },
  { id: 44, name: 'Press Photos 2', client: 'Teenage Priest', type: 'Photo', year: '-', width: 230, row: 2, images: ['/projects/teenage-priest-press-2/cover.jpg', '/projects/teenage-priest-press-2/1.jpg', '/projects/teenage-priest-press-2/2.jpg', '/projects/teenage-priest-press-2/3.jpg', '/projects/teenage-priest-press-2/4.jpg', '/projects/teenage-priest-press-2/5.jpg', '/projects/teenage-priest-press-2/6.jpg', '/projects/teenage-priest-press-2/7.jpg'], subtag: 'Branding' },
  { id: 45, name: 'People Stories Campaign', client: 'UMI', type: 'Photo', year: '-', width: 240, row: 1, images: ['/projects/umi-people-stories-campaign/cover.png', '/projects/umi-people-stories-campaign/2.png', '/projects/umi-people-stories-campaign/3.png', '/projects/umi-people-stories-campaign/4.png', '/projects/umi-people-stories-campaign/5.png', '/projects/umi-people-stories-campaign/6.png'], subtag: 'Branding' },
  { id: 46, name: 'Press Photos', client: 'UMI', type: 'Photo', year: '-', width: 250, row: 2, images: ['/projects/umi-press-photos/cover.png', '/projects/umi-press-photos/1.png', '/projects/umi-press-photos/2.png', '/projects/umi-press-photos/3.png', '/projects/umi-press-photos/4.png'], subtag: 'Branding' },
  // VIDEO
  { id: 47, name: '"Not Like You" MV', client: 'Groupthink', type: 'Video', year: '-', width: 260, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/GAVlRqO6Azs', subtag: 'Branding' },
  { id: 48, name: '"Rokkout" MV', client: 'Paris Texas', type: 'Video', year: '-', width: 270, row: 2, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/YCHyvYkFSNw', subtag: 'Branding' },
  { id: 49, name: 'Standby MV', client: 'Perfect Person', type: 'Video', year: '-', width: 280, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/UjIHnEIlwJg', subtag: 'Branding' },
  { id: 50, name: 'Ad Campaign', client: 'Reebok x Market', type: 'Video', year: '-', width: 220, row: 2, images: [], isVideo: true, videoSrc: '', subtag: 'Branding' },
  { id: 51, name: 'Blister MV', client: 'Shye01', type: 'Video', year: '-', width: 230, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/Yq91ZsWU9Tw', subtag: 'Branding' },
  { id: 52, name: 'Dress Up MV', client: 'Shye01', type: 'Video', year: '-', width: 240, row: 2, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/OhrUWOXoFio', subtag: 'Branding' },
  { id: 53, name: 'Green Apple / Promise MV', client: 'Shye01', type: 'Video', year: '-', width: 250, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/uqUH5JybCRE', subtag: 'Branding' },
  { id: 54, name: 'On My Side MV', client: 'Shye01', type: 'Video', year: '-', width: 260, row: 2, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/tbz9QAKvtGo', subtag: 'Branding' },
  { id: 55, name: '"Dreaming" MV', client: 'Teenage Priest', type: 'Video', year: '-', width: 270, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/KwhjOrunf1A', subtag: 'Branding' },
  { id: 56, name: 'Right/Wrong MV', client: 'UMI', type: 'Video', year: '-', width: 280, row: 2, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/xAO851qj6d0', subtag: 'Branding' },
  { id: 57, name: 'Somewhere New MV', client: 'UMI', type: 'Video', year: '-', width: 220, row: 1, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/tmO77J2Lh1U', subtag: 'Branding' },
  { id: 61, name: 'What Now MV', client: 'UMI', type: 'Video', year: '-', width: 230, row: 2, images: [], isVideo: true, videoSrc: 'https://www.youtube.com/embed/-BMub_kRQeU', subtag: 'Branding' },
]

// Only still projects in scrolling rows
const stillProjects = projects.filter(p => !p.isVideo)
const uniqueTypes = [...new Set(projects.map(p => p.type))].sort()
const uniqueYears = [...new Set(projects.map(p => p.year))].sort()

export default function Home() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [row1Paused, setRow1Paused] = useState(false)
  const [row2Paused, setRow2Paused] = useState(false)
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [filterType, setFilterType] = useState(null)
  const [filterYear, setFilterYear] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [copied, setCopied] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const sortedProjects = useMemo(() => {
    let filtered = projects
    if (filterType === 'Branding') {
      filtered = filtered.filter(p => p.subtag === 'Branding')
    } else if (filterType) {
      filtered = filtered.filter(p => p.type === filterType)
    }
    if (filterYear) filtered = filtered.filter(p => p.year === filterYear)
    if (!sortField) return filtered
    return [...filtered].sort((a, b) => {
      const aVal = (a[sortField] || '').toLowerCase()
      const bVal = (b[sortField] || '').toLowerCase()
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [sortField, sortDir, filterType, filterYear])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  useEffect(() => {
    if (!openDropdown) return
    const close = () => setOpenDropdown(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [openDropdown])

  useEffect(() => {
    document.body.style.background = darkMode ? '#1a1a1a' : '#F6F6F6'
  }, [darkMode])

  useEffect(() => {
    if (thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[currentImageIndex]
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentImageIndex])

  useEffect(() => {
    if (currentView !== 'index') return
    if (sortedProjects.length === 0) {
      setSelectedProject(null)
      return
    }
    if (selectedProject && !sortedProjects.find(p => p.id === selectedProject.id)) {
      setSelectedProject(sortedProjects[0])
      setCurrentImageIndex(0)
    }
  }, [sortedProjects, selectedProject, currentView])

  const thumbsRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const row1AnimRef = useRef(null)
  const row2AnimRef = useRef(null)
  const row1PosRef = useRef(0)
  const row2PosRef = useRef(0)
  const row1PausedRef = useRef(false)
  const row2PausedRef = useRef(false)

  const row1Projects = stillProjects.filter(p => p.row === 1)
  const row2Projects = stillProjects.filter(p => p.row === 2)

  const row1Items = [...row1Projects, ...row1Projects, ...row1Projects]
  const row2Items = [...row2Projects, ...row2Projects, ...row2Projects]

  const gap = 8
  const row1SetWidthRef = useRef(0)
  const row2SetWidthRef = useRef(0)
  const row2InitRef = useRef(false)

  const measureRows = useCallback(() => {
    if (row1Ref.current && row1SetWidthRef.current === 0) {
      const children = row1Ref.current.children
      let allReady = true
      let w = 0
      for (let i = 0; i < row1Projects.length; i++) {
        const img = children[i]?.querySelector('img')
        if (!img?.complete || img.naturalWidth === 0) { allReady = false; break }
        w += children[i].offsetWidth
      }
      if (allReady) {
        w += row1Projects.length * gap
        row1SetWidthRef.current = w
      }
    }
    if (row2Ref.current && row2SetWidthRef.current === 0) {
      const children = row2Ref.current.children
      let allReady = true
      let w = 0
      for (let i = 0; i < row2Projects.length; i++) {
        const img = children[i]?.querySelector('img')
        if (!img?.complete || img.naturalWidth === 0) { allReady = false; break }
        w += children[i].offsetWidth
      }
      if (allReady) {
        w += row2Projects.length * gap
        row2SetWidthRef.current = w
        if (!row2InitRef.current) {
          row2PosRef.current = -w
          row2InitRef.current = true
        }
      }
    }
  }, [row1Projects.length, row2Projects.length])

  useEffect(() => {
    const check = () => {
      measureRows()
      if (row1SetWidthRef.current === 0 || row2SetWidthRef.current === 0) {
        requestAnimationFrame(check)
      }
    }
    requestAnimationFrame(check)
  }, [measureRows])

  useEffect(() => {
    const speed = 0.4

    function animateRow1() {
      const sw = row1SetWidthRef.current
      if (!row1PausedRef.current && row1Ref.current && sw > 0) {
        row1PosRef.current -= speed
        if (Math.abs(row1PosRef.current) >= sw) row1PosRef.current += sw
        row1Ref.current.style.transform = `translateX(${row1PosRef.current}px)`
      }
      row1AnimRef.current = requestAnimationFrame(animateRow1)
    }

    function animateRow2() {
      const sw = row2SetWidthRef.current
      if (!row2PausedRef.current && row2Ref.current && sw > 0) {
        row2PosRef.current += speed
        if (row2PosRef.current >= 0) row2PosRef.current -= sw
        row2Ref.current.style.transform = `translateX(${row2PosRef.current}px)`
      }
      row2AnimRef.current = requestAnimationFrame(animateRow2)
    }

    row1AnimRef.current = requestAnimationFrame(animateRow1)
    row2AnimRef.current = requestAnimationFrame(animateRow2)

    return () => {
      cancelAnimationFrame(row1AnimRef.current)
      cancelAnimationFrame(row2AnimRef.current)
    }
  }, [])

  useEffect(() => {
    function handleWheel1(e) {
      e.preventDefault()
      const sw = row1SetWidthRef.current
      if (sw <= 0) return
      const delta = e.deltaX || e.deltaY
      row1PosRef.current -= delta * 0.5
      if (Math.abs(row1PosRef.current) >= sw) row1PosRef.current += sw
      else if (row1PosRef.current > 0) row1PosRef.current -= sw
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${row1PosRef.current}px)`
    }
    function handleWheel2(e) {
      e.preventDefault()
      const sw = row2SetWidthRef.current
      if (sw <= 0) return
      const delta = e.deltaX || e.deltaY
      row2PosRef.current -= delta * 0.5
      if (row2PosRef.current >= 0) row2PosRef.current -= sw
      else if (Math.abs(row2PosRef.current) >= sw * 2) row2PosRef.current += sw
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${row2PosRef.current}px)`
    }
    const r1 = document.getElementById('row1')
    const r2 = document.getElementById('row2')
    if (r1) r1.addEventListener('wheel', handleWheel1, { passive: false })
    if (r2) r2.addEventListener('wheel', handleWheel2, { passive: false })

    // Touch/swipe support for mobile
    let touch1Start = null
    let touch2Start = null
    function handleTouch1Start(e) { touch1Start = e.touches[0].clientX; row1PausedRef.current = true }
    function handleTouch1Move(e) {
      if (touch1Start === null) return
      e.preventDefault()
      const sw = row1SetWidthRef.current
      if (sw <= 0) return
      const diff = e.touches[0].clientX - touch1Start
      touch1Start = e.touches[0].clientX
      row1PosRef.current += diff * 1.2
      if (Math.abs(row1PosRef.current) >= sw) row1PosRef.current += sw
      else if (row1PosRef.current > 0) row1PosRef.current -= sw
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${row1PosRef.current}px)`
    }
    function handleTouch1End() { touch1Start = null; row1PausedRef.current = false }
    function handleTouch2Start(e) { touch2Start = e.touches[0].clientX; row2PausedRef.current = true }
    function handleTouch2Move(e) {
      if (touch2Start === null) return
      e.preventDefault()
      const sw = row2SetWidthRef.current
      if (sw <= 0) return
      const diff = e.touches[0].clientX - touch2Start
      touch2Start = e.touches[0].clientX
      row2PosRef.current += diff * 1.2
      if (row2PosRef.current >= 0) row2PosRef.current -= sw
      else if (Math.abs(row2PosRef.current) >= sw * 2) row2PosRef.current += sw
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${row2PosRef.current}px)`
    }
    function handleTouch2End() { touch2Start = null; row2PausedRef.current = false }

    if (r1) {
      r1.addEventListener('touchstart', handleTouch1Start, { passive: true })
      r1.addEventListener('touchmove', handleTouch1Move, { passive: false })
      r1.addEventListener('touchend', handleTouch1End)
    }
    if (r2) {
      r2.addEventListener('touchstart', handleTouch2Start, { passive: true })
      r2.addEventListener('touchmove', handleTouch2Move, { passive: false })
      r2.addEventListener('touchend', handleTouch2End)
    }

    return () => {
      if (r1) {
        r1.removeEventListener('wheel', handleWheel1)
        r1.removeEventListener('touchstart', handleTouch1Start)
        r1.removeEventListener('touchmove', handleTouch1Move)
        r1.removeEventListener('touchend', handleTouch1End)
      }
      if (r2) {
        r2.removeEventListener('wheel', handleWheel2)
        r2.removeEventListener('touchstart', handleTouch2Start)
        r2.removeEventListener('touchmove', handleTouch2Move)
        r2.removeEventListener('touchend', handleTouch2End)
      }
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      row1SetWidthRef.current = 0
      row2SetWidthRef.current = 0
      row2InitRef.current = false
      measureRows()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [measureRows])

  const pauseRow1 = () => { row1PausedRef.current = true; setRow1Paused(true) }
  const resumeRow1 = () => { row1PausedRef.current = false; setRow1Paused(false) }
  const pauseRow2 = () => { row2PausedRef.current = true; setRow2Paused(true) }
  const resumeRow2 = () => { row2PausedRef.current = false; setRow2Paused(false) }

  const navigateTo = (view, project) => {
    setCurrentView(view)
    if (view === 'index') {
      setSelectedProject(project || projects[0])
      setCurrentImageIndex(0)
    } else {
      setSelectedProject(null)
      setCurrentImageIndex(0)
    }
  }

  const handleTableRowClick = (project) => {
    if (selectedProject?.id === project.id) return
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const showImageRows = currentView === 'home' || currentView === 'about'

  const renderProjectItem = (project, keyPrefix, i) => (
    <div
      key={`${keyPrefix}-${i}`}
      className="project-item"
      onClick={() => navigateTo('index', project)}
      style={{ cursor: 'pointer' }}
    >
      <img src={project.images[0]} alt={project.name} />
      <div className="project-overlay">
        <div className="project-overlay-text">
          <h4>{project.name}</h4>
          <p>{project.client}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`page${darkMode ? ' dark' : ''}`}>
      <div className="logo" onClick={() => navigateTo('home')}>
        <img src="/exp.svg" alt="EXP" />
      </div>

      <div className={`project-rows${!showImageRows ? ' hidden' : ''}`}>
        <div
          id="row1"
          className={`project-row${row1Paused ? ' paused' : ''}`}
          onMouseEnter={pauseRow1}
          onMouseLeave={resumeRow1}
          onTouchStart={pauseRow1}
          onTouchEnd={resumeRow1}
        >
          <div className="project-row-track" ref={row1Ref}>
            {row1Items.map((p, i) => renderProjectItem(p, 'r1', i))}
          </div>
        </div>

        <div
          id="row2"
          className={`project-row${row2Paused ? ' paused' : ''}`}
          onMouseEnter={pauseRow2}
          onMouseLeave={resumeRow2}
          onTouchStart={pauseRow2}
          onTouchEnd={resumeRow2}
        >
          <div className="project-row-track" ref={row2Ref}>
            {row2Items.map((p, i) => renderProjectItem(p, 'r2', i))}
          </div>
        </div>
      </div>

      {currentView === 'home' && (
        <p className="tagline">exp is a design & creative agency based in los angeles, ca</p>
      )}

      {currentView === 'index' && (
        <div className="bounding-box">
          <div className="bounding-box-header">
            <h3>clientele:</h3>
          </div>
          <div className="filter-table-container">
            <table className="filter-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('client')}>client{sortField === 'client' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</th>
                  <th onClick={() => handleSort('name')}>project{sortField === 'name' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</th>
                  <th className="filter-th" onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'type' ? null : 'type') }}>
                    {filterType === 'Branding' ? 'dir./brand.' : filterType ? filterType.toLowerCase() : 'field'} <span className="dropdown-arrow">▾</span>
                    {openDropdown === 'type' && (
                      <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className={!filterType ? 'active' : ''} onClick={() => { setFilterType(null); setOpenDropdown(null) }}>all</div>
                        {uniqueTypes.map(t => (
                          <div key={t} className={filterType === t ? 'active' : ''} onClick={() => { setFilterType(t); setOpenDropdown(null) }}>{t.toLowerCase()}</div>
                        ))}
                        <div className="filter-dropdown-divider" />
                        <div className={filterType === 'Branding' ? 'active' : ''} onClick={() => { setFilterType('Branding'); setOpenDropdown(null) }}>dir./brand.</div>
                      </div>
                    )}
                  </th>
                  <th className="filter-th" onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'year' ? null : 'year') }}>
                    {filterYear || 'year'} <span className="dropdown-arrow">▾</span>
                    {openDropdown === 'year' && (
                      <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className={!filterYear ? 'active' : ''} onClick={() => { setFilterYear(null); setOpenDropdown(null) }}>all</div>
                        {uniqueYears.map(y => (
                          <div key={y} className={filterYear === y ? 'active' : ''} onClick={() => { setFilterYear(y); setOpenDropdown(null) }}>{y}</div>
                        ))}
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => (
                  <tr
                    key={project.id}
                    className={selectedProject?.id === project.id ? 'active' : ''}
                    onClick={() => handleTableRowClick(project)}
                  >
                    <td>{project.client}</td>
                    <td>{project.name}</td>
                    <td>{project.type}</td>
                    <td>{project.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentView === 'index' && selectedProject && (
        <>
          <div className="detail-panel">
            <div className="detail-panel-image">
              {selectedProject.isVideo && selectedProject.videoSrc ? (
                <div className="video-embed-wrapper" key={selectedProject.videoSrc}>
                  <iframe
                    src={selectedProject.videoSrc}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selectedProject.isVideo ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'rgba(0,0,0,0.3)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                  video coming soon
                </div>
              ) : (
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.name}
                />
              )}
            </div>
            {!selectedProject.isVideo && selectedProject.images.length > 1 && (
              <div className="detail-thumbnails-wrap">
                <button className="thumb-arrow thumb-arrow-left" onClick={() => setCurrentImageIndex(i => i <= 0 ? selectedProject.images.length - 1 : i - 1)}>‹</button>
                <div className="detail-thumbnails" ref={thumbsRef}>
                  {selectedProject.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`detail-thumb${idx === currentImageIndex ? ' active' : ''}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img src={img} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
                <button className="thumb-arrow thumb-arrow-right" onClick={() => setCurrentImageIndex(i => i >= selectedProject.images.length - 1 ? 0 : i + 1)}>›</button>
              </div>
            )}
          </div>

          <div className="detail-metadata">
            <div className="meta-field">
              <div className="meta-label">project</div>
              <div className="meta-value">{selectedProject.name}</div>
            </div>
            <div className="meta-field">
              <div className="meta-label">client</div>
              <div className="meta-value">{selectedProject.client}</div>
            </div>
            <div className="meta-field">
              <div className="meta-label">year</div>
              <div className="meta-value">{selectedProject.year}</div>
            </div>
            <div className="meta-field">
              <div className="meta-label">role</div>
              <div className="meta-value">{selectedProject.subtag ? `${selectedProject.type} / dir./brand.` : selectedProject.type}</div>
            </div>
          </div>
        </>
      )}

      {currentView === 'about' && (
        <div className="about-content">
          <div className="about-text">
            EXP is a creative design studio specializing in branding, creative direction, photo, design and video in the fields of music, commercial brands, fashion, and other projects of all kinds. Inspired by the limitless potential of exploration, experimentation, and experience, EXP thrives on the infinite interpretations of its prefix —constantly evolving, expanding, and expressing bold, meaningful ideas.
          </div>
          <div className="about-clientele">
            <h4>Select Clientele:</h4>
            <ul>
              <li>Nike</li>
              <li>Usal Project</li>
              <li>Bonnie Clyde</li>
              <li>Leon Thomas</li>
              <li>UMI</li>
              <li>Interscope</li>
              <li>Reebok</li>
              <li>Salomon</li>
              <li>Paris Texas</li>
              <li>Oxis</li>
              <li>Love Spells</li>
              <li>etc.</li>
            </ul>
          </div>
        </div>
      )}

      <nav className="nav">
        <a
          href="#"
          className={currentView === 'home' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigateTo('home') }}
        >home</a>
        <a
          href="#"
          className={currentView === 'index' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigateTo('index') }}
        >index</a>
        <a
          href="#"
          className={currentView === 'about' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigateTo('about') }}
        >about</a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText('eric@familyaffairsla.com'); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        >{copied ? 'copied!' : 'contact'}</a>
      </nav>

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
        <div className="theme-toggle-track">
          <svg className="theme-toggle-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg className="theme-toggle-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <div className="theme-toggle-thumb" />
        </div>
      </button>
    </div>
  )
}
