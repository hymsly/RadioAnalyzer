import os
class Polinomio:
	def writeFile ( self ):
		file = open ( self.path_file , 'w' )
		for i in range ( self.grado ):
			file.write( str ( self.coeficientes[i] ) )
			if( i+1 == self.grado ):
				file.write('\n')
			else:
				file.write(' ')
		if( self.grado == 0 ):
			file.write('0\n')
		file.close()
	def showFilePath ( self ):
		print( self.path_file )
	def getGreatestGrade ( self ):
		length = len( self.coeficientes )
		for i in range( 1 , length+1 ):
			if( self.coeficientes[-i] != 0 ):
				return i
		return length+1

	def readPolinomio( self ):
		file = open( self.path_file , 'r' )
		listaCoeficientes = file.readline()
		self.coeficientes = [ int( coef ) for coef in listaCoeficientes.split() ]
		greatestGrade = self.getGreatestGrade()
		if( greatestGrade != 1 ):
			self.coeficientes = self.coeficientes [ : -greatestGrade+1 ]
		self.grado = len( self.coeficientes )
		file.close()

	def horner( self , divisor , cociente , residuo ):
		if( divisor.grado == 0 ):
			return ( cociente , residuo , 'No existe division entre 0' )
		cociente.coeficientes = [ 0 ] * max( self.grado - divisor.grado + 1 , 0 )
		cociente.grado = len( cociente.coeficientes )
		residuo.coeficientes = [ 0 ] * min( divisor.grado - 1 , self.grado )
		residuo.grado = len( residuo.coeficientes )

		auxiliar = [ 0 ] * self.grado
		for i in range ( cociente.grado ):
			cociente.coeficientes[ - i - 1 ] = (dividendo.coeficientes[ - i - 1 ] + auxiliar[ - i - 1 ]) / divisor.coeficientes[ -1 ]
			for j in range ( divisor.grado - 1 ):
				auxiliar[ - i - j - 2 ] += -cociente.coeficientes[ - i - 1 ] * divisor.coeficientes[ - j - 2 ]

		for i in range ( residuo.grado ):
			residuo.coeficientes[ residuo.grado - i - 1 ] = dividendo.coeficientes[ residuo.grado - i - 1 ] + auxiliar[ residuo.grado - i - 1 ]

		return ( cociente , residuo , 'existe division' )

if __name__ == '__main__':
    folder = 'polinomios'
    filenameDividendo = 'dividendo.txt'
    filenameDivisor = 'divisor.txt'
    pathFileDividendo = os.path.join( folder , filenameDividendo )
    pathFileDivisor = os.path.join( folder , filenameDivisor )

    dividendo = Polinomio()
    dividendo.path_file = pathFileDividendo
    dividendo.readPolinomio()
    divisor = Polinomio()
    divisor.path_file = pathFileDivisor
    divisor.readPolinomio()

    filenameCociente = 'cociente.txt'
    filenameResiduo = 'residuo.txt'
    pathFileCociente = os.path.join( folder , filenameCociente )
    pathFileResiduo = os.path.join( folder , filenameResiduo )
    cociente = Polinomio()
    cociente.path_file = pathFileCociente
    residuo = Polinomio()
    residuo.path_file = pathFileResiduo

    cociente , residuo , error = dividendo.horner( divisor , cociente , residuo)
    if( error == 'No existe division entre 0' ):
        print( error )
    else:
        cociente.writeFile()
        residuo.writeFile()
