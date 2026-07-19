export default function Title({ section }) {
  return (
    <div className='section-heading'>
      <span aria-hidden='true'>{'//'}</span>
      <h2>{section}</h2>
      <span>PLEO2</span>
    </div>
  )
}
