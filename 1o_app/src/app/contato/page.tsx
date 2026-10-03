export default function Contato() 
{
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Formulário de Contato</h2>

        <div className="text-green-600 font-medium">
          Obrigado por entrar em contato!
        </div>
  
      <form>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome completo:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="nome"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          E-mail para contato:
          <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="email" name="email"/>
        </label>

        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Deixe sua mensagem:
          <textarea className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            name="mensagem"/>
        </label>
        <br></br>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
           Enviando Dados
        </button>
      </form>
    </div>
    </div>
  );
}