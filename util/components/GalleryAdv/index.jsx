import React from 'react'

export function GalleryAdv({ hash }) {
  // const { width } = window.screen

  return (
    <div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            var slotGalleryAdv, hasGalleryAdv = true;
            googletag.cmd.push(function() {
              slotGalleryAdv = googletag
                .defineSlot("${hash}", [660, 470], 'galleryAdv-container')
                .setTargeting('pos', 'Galeria1_Imagem')
                .setForceSafeFrame(true)
                .addService(googletag.pubads());

              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
        `,
        }}
      />
      <div id="galleryAdv-container">
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `googletag.cmd.push(function() {
              googletag.display('galleryAdv-container');
              
              googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                if (event.slot === slotGalleryAdv && event.isEmpty) {
                  hasGalleryAdv = false;
                }
              });
            });`,
          }}
        />
      </div>
    </div>
  )
}
