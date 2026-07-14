export function renderHTML(): string {
  return /* html */ `
  <button class="jb-switch-web-component" part="component" type="button" role="switch" aria-checked="false">
    <span class="caption true-text" part="true-text"></span>
    <span class="svg-wrapper" part="svg-wrapper">
        <svg class="switch-svg" part="switch" viewBox=" 0 0 710 440" aria-hidden="true">
            <defs>
                <filter xmlns="http://www.w3.org/2000/svg" id="drop-shadow" height="150%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="7"></feGaussianBlur>
                    <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.9"></feFuncA>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
                <radialGradient id="color1" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" style="stop-color:rgb(255,255,255); stop-opacity:1" />
                    <stop offset="99%" style="stop-color:rgb(224,224,224); stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(224,224,224); stop-opacity:1" />
                </radialGradient>
            </defs>
            <rect class="bg-bar" part="bar" x="20" y="40" height="360" width="680" stroke="red" rx="180" stroke-width="0" />
            <g class="trigger-button" part="trigger-button">
                <circle class="trigger-circle" part="trigger" fill="url(#color1)" cx="220" cy="220" r="200"
                filter="url(#drop-shadow)" />
            <circle class="trigger-circle-bar" part="trigger-ring" cx=" 220" cy="220" r="120"
                filter="url(#drop-shadow)" />
            </g>

        </svg>
    </span>
    <span class="caption false-text" part="false-text"></span>
  </button>
  `;
}
