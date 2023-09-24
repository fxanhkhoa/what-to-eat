<script>
    const rand = (m, M) => Math.random() * (M - m) + m
    const tot = sectors.length
    const spinEl = document.querySelector('#spin')
    // @ts-ignore
    const ctx = document.querySelector<HTMLCanvasElement>('#wheel')?.getContext('2d')
    const dia = ctx.canvas.width
    const rad = dia / 2
    const PI = Math.PI
    const TAU = 2 * PI
    const arc = TAU / sectors.length
</script>